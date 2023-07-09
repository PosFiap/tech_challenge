import { CheckoutService, ICheckoutService } from '../../modules/pagamento'
import { Either } from '../../utils/either'
import { MeioPagamentoMercadoPago } from '../gateways/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../infra/HttpsMock'
import { PagamentoPedidoRepository } from '../persistence/PagamendoPedidoRepository'
import { IPagamentoQrCodeController } from './IPagamentoQrCodeController'

export class PagamentoQrCodeController implements IPagamentoQrCodeController {
  private constructor (private readonly checkoutService: ICheckoutService<string>) {}

  static create (checkoutService?: ICheckoutService<string>): IPagamentoQrCodeController {
    if (!checkoutService) {
      const qrCode = new MeioPagamentoMercadoPago(new HttpClientMock())
      const defauCheckoutService = new CheckoutService<string>(qrCode, new PagamentoPedidoRepository())
      return new PagamentoQrCodeController(defauCheckoutService)
    }
    return new PagamentoQrCodeController(checkoutService)
  }

  async gerarPagamentoQrCode (codigoPedido: number): Promise<Either<string, string>> {
    return await this.checkoutService.checkoutQrCode(codigoPedido)
  }
}
