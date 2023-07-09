import { Either } from '../../utils'

export interface IPagamentoQrCodeController {
  gerarPagamentoQrCode (codigoPedido: number): Promise<Either<string, string>>
}
