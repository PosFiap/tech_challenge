import { IHttp } from '../../modules/pagamento'
import { CustomError, CustomErrorType } from '../../utils'

interface StatusPedido {
  pedido?: string
  status: 'PAID' | 'NOT_PAID'
}

interface Payment {
  order: {
    id: string
    type: string
  }
}

interface Order {
  id: number
  status: string
  external_reference: string | null
  payments: Array<{
    id: number
    transaction_amount: number
    total_paid_amount: number
    shipping_cost: number
    currency_id: string
    status: string
    status_detail: string
    date_approved: string
    date_created: string
    last_modified: string
    amount_refunded: number
  }>
  shipments: []
  payouts: []
  collector: {
    id: number
    email: string
    nickname: string
  }
  marketplace: string
  notification_url: string | null
  date_created: string
  last_updated: string
  sanitized_version: number
  sponsor_id: null
  shipping_cost: number
  total_amount: number
  site_id: string
  paid_amount: number
  refunded_amount: number
  payer: null
  items: Array<{
    id: string
    category_id: string
    currency_id: string
    description: string
    picture_url: string | null
    title: string
    quantity: number
    unit_price: number
  }>
  cancelled: boolean
  additional_info: string | null
  application_id: string | null
  is_test: boolean
  order_status: string
}

export class MeioPagamentoUpdateStatus {
  private readonly baseUrl = 'api.mercadopago.com'
  constructor (
    private readonly _http: IHttp,
    private readonly _accessToken: string | undefined
  ) {}

  private async getPayment (id: string): Promise<Payment> {
    try {
      const response = await this._http.request<Payment>({
        host: this.baseUrl,
        path: `/v1/payments/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this._accessToken as string}`
        }
      })

      if (response.body) {
        return response.body
      } else {
        console.log(JSON.stringify(response, null, 2))
        throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Resposta da requets sem conteudo de dados')
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async getMerchantOrder (id: string): Promise<Order> {
    try {
      const response = await this._http.request<Order>({
        host: this.baseUrl,
        path: `/merchant_orders/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this._accessToken as string}`
        }
      })

      if (response.body) {
        return response.body
      } else {
        console.log(JSON.stringify(response, null, 2))
        throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Resposta da requets sem conteudo de dados')
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getStatusPedidoByEvent (topic: string, id: string): Promise<StatusPedido> {
    let order: Order | null = null

    switch (topic) {
      case 'payment':
        const payment = await this.getPayment(id)
        order = await this.getMerchantOrder(payment.order.id)
        break

      case 'merchant_order':
        order = await this.getMerchantOrder(id)
        break
    }

    if (order) {
      const paidAmount = order.payments
        .filter(payment => payment.status === 'approved')
        .map(payment => payment.transaction_amount)
        .reduce((a, b) => a + b, 0)

      if (paidAmount >= order.total_amount) {
        console.log('Pagamento total efetuado! Entrega deve ser efetuada.')
        return { pedido: order.external_reference!, status: 'PAID' }
      } else {
        console.log('Ainda não foi efetuao o pagamento.')
        return { status: 'NOT_PAID' }
      }
    }

    return { status: 'NOT_PAID' }
  }
}
