import { CheckoutService } from '../../modules/pagamento'
import { Either } from '../../utils/either'
import { MeioPagamentoMercadoPago } from '../gateways/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../infra/HttpsMock'
import { PagamentoPedidoRepository } from '../persistence/PagamendoPedidoRepository'

export class PagamentoQrCodeAdapter {
  async gerarPagamentoQrCode (codigoPedido: number): Promise<Either<string, string>> {
    const qrCode = new MeioPagamentoMercadoPago(new HttpClientMock())
    const checkoutService = new CheckoutService(qrCode, new PagamentoPedidoRepository())
    const result = await checkoutService.checkoutQrCode(codigoPedido)

    return result
  }
}
