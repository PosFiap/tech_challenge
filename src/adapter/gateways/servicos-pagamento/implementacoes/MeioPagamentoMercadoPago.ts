import { PedidoPagamentoDTO, IHttp, IMeioDePagamentoQR } from '../../../../modules/pagamento'
import { CustomError, CustomErrorType } from '../../../../utils'

interface ItemFatura {
  sku_number: string
  category: string
  title: string
  description: string
  unit_price: number
  quantity: number
  unit_measure: string
  total_amount: number
}

export interface Fatura {
  external_reference: string
  title: string
  total_amount: number
  description: string
  items: ItemFatura[]
  taxes?: [
    {
      value: number
      type: string
    }
  ]
}

export class MeioPagamentoMercadoPago implements IMeioDePagamentoQR<PedidoPagamentoDTO, string> {
  private readonly _http: IHttp
  private readonly _idUsuarioMercadoPago: string | undefined
  private readonly _idExternoPontoDeVenda: string | undefined
  private readonly _accessToken: string | undefined

  constructor (http: IHttp) {
    this._http = http
    this._idUsuarioMercadoPago = process.env.ID_USUARIO_MP
    this._idExternoPontoDeVenda = process.env.ID_EXTERNO_CAIXA
    this._accessToken = process.env.ACCESS_TOKEN_MP

    this.validaSeRecebeuOsParametros()
  }

  private mapPedidoPagamentoDTOParaFatura (pedido: PedidoPagamentoDTO): Fatura {
    return {
      external_reference: pedido.codigo.toString(),
      total_amount: pedido.itensDePedido.map(item => item.valor).reduce((a, c) => a + c, 0),
      items: pedido.itensDePedido.map(item => ({
        title: item.nome,
        unit_price: item.valor,
        quantity: 1,
        total_amount: item.valor,
        category: item.categoria_codigo.toString(),
        description: item.descricao,
        unit_measure: 'unidade',
        sku_number: `${item.codigo}`
      })),
      description: 'Pedido',
      title: 'Combo'
    }
  }

  private validaSeRecebeuOsParametros (): void {
    if (!this._http) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Cliente http é requerido.')
    }

    if (!this._idUsuarioMercadoPago || !this._idExternoPontoDeVenda || !this._accessToken) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Credenciais mercado pago são requeridas.')
    }
  }

  async checkoutQrCode (pedido: PedidoPagamentoDTO): Promise<string> {
    try {
      const fatura = this.mapPedidoPagamentoDTOParaFatura(pedido)
      const response = await this._http.request<{ qr_data: string }>({
        host: 'https://api.mercadopago.com',
        path: `/instore/orders/qr/seller/collectors/${this._idUsuarioMercadoPago as string}/pos/${this._idExternoPontoDeVenda as string}/qrs`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._accessToken as string}`
        },
        body: fatura
      })

      if (response.body) {
        return response.body.qr_data
      } else {
        throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Resposta da requets sem conteudo de dados')
      }
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.BusinessRuleViolation, (error as Error).message)
    }
  }
}
