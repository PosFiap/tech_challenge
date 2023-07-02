import { CheckoutService } from '../../modules/pagamento'
import { Fatura, MeioPagamentoMercadoPago } from '../gateways/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../infra/HttpsMock'

export class PagamentoQrCodeAdapter {
  async gerarPagamentoQrCode(pedido: Fatura): Promise<string> {
    const qrCode = new MeioPagamentoMercadoPago(new HttpClientMock())
    const checkoutService = new CheckoutService(qrCode)
    const result = await checkoutService.checkoutQrCode(pedido)
    return result
  }
}
