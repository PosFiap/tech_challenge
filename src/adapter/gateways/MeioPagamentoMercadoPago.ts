import { PedidoPagamentoDTO, IHttp, IMeioDePagamentoQR } from '../../modules/pagamento'
import { CustomError, CustomErrorType, Either, isErro, makeErro, makeSucesso } from '../../utils'

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

    const valido = this.validaSeRecebeuOsParametros()
    if (isErro(valido)) {
      throw new CustomError(CustomErrorType.InstantiatingError, valido.erro)
    }
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

  private validaSeRecebeuOsParametros (): Either<string, boolean> {
    if (!this._http) {
      return makeErro('Cliente http é requerido.')
    }

    if (!this._idUsuarioMercadoPago || !this._idExternoPontoDeVenda || !this._accessToken) {
      return makeErro('Credenciais mercado pago são requeridas.')
    }

    return makeSucesso(true)
  }

  async checkoutQrCode (pedido: PedidoPagamentoDTO): Promise<Either<string, string>> {
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
        return makeSucesso(response.body.qr_data)
      } else {
        return makeErro('Resposta da requets sem conteudo de dados')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
