import { Either } from '../../../utils'

export interface IMeioDePagamentoQR<T, S> {
  checkoutQrCode(pedido: T): Promise<Either<string, S>>
}
