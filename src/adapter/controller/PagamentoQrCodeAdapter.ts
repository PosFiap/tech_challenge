import { CheckoutService } from '../../modules/pagamento'
import { PedidoService } from '../../modules/pedido/PedidoService'
import { Fatura, MeioPagamentoMercadoPago } from '../gateways/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../infra/HttpsMock'

export class PagamentoQrCodeAdapter {
  async gerarPagamentoQrCode(pedidoId: string): Promise<string> {
    const pedidoService = new PedidoService()
    const pedido = {} as Fatura
    const qrCode = new MeioPagamentoMercadoPago(new HttpClientMock())
    const checkoutService = new CheckoutService(qrCode)
    const result = await checkoutService.checkoutQrCode(pedido)
    return result
  }
}
