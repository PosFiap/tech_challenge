import { IHttp } from '../../modules/pagamento/ports/IHttp'
import { IMeioDePagamentoQR } from '../../modules/pagamento/ports/IMeioDePagamentoQR'
import { CustomError } from '../../utils/customError'

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

interface Fatura {
  external_reference: string
  title: string
  total_amount: number
  description: string
  items: ItemFatura[]
  taxes: [
    {
      value: number
      type: string
    }
  ]
}

export class MeioPagamentoMercadoPago implements IMeioDePagamentoQR<Fatura, string> {
  private readonly _http: IHttp
  private readonly _idUsuarioMercadoPago: string | undefined
  private readonly _idExternoPontoDeVenda: string | undefined
  private readonly _accessToken: string | undefined

  constructor(http: IHttp) {
    this._http = http
    this._idUsuarioMercadoPago = process.env.ID_USUARIO_MP
    this._idExternoPontoDeVenda = process.env.ID_EXTERNO_CAIXA
    this._accessToken = process.env.ACCESS_TOKEN_MP

    this.validaSeRecebeuOsParametros()
  }

  private validaSeRecebeuOsParametros() {
    if (!this._http) {
      throw new CustomError('Erro ao criar instancia de MeioPagamentoMercadoPago.', 'Client http é requerido.')
    }

    if (!this._idUsuarioMercadoPago || !this._idExternoPontoDeVenda || !this._accessToken) {
      throw new CustomError(
        'Erro ao criar instancia de MeioPagamentoMercadoPago.',
        'Não encontrado variaveis de ambiente com os valores de id de usuario, access token e id externo do ponto de venda.'
      )
    }
  }

  async checkoutQrCode(pedido: Fatura): Promise<string> {
    try {
      const response = await this._http.request<{ qr_data: string }>({
        host: 'https://api.mercadopago.com',
        path: `/instore/orders/qr/seller/collectors/${this._idUsuarioMercadoPago}/pos/${this._idExternoPontoDeVenda}/qrs`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this._accessToken}`
        },
        body: pedido
      })

      if (response.body) {
        return response.body.qr_data
      } else {
        throw new CustomError('Retorno de dados não esperado.', 'A request para criar um QRCode retornou um resultado sem o body contendo as informações.')
      }
    } catch (error) {
      throw error
    }
  }
}
