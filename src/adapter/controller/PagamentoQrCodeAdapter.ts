import { type CheckoutService } from '../../modules/pagamento'
import { Either } from '../../utils/either'

export class PagamentoQrCodeAdapter {
  constructor (private readonly checkoutService: CheckoutService<string>) {}

  async gerarPagamentoQrCode (codigoPedido: number): Promise<Either<string, string>> {
    return await this.checkoutService.checkoutQrCode(codigoPedido)
  }
}
