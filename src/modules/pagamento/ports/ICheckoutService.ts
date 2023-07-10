import { Either } from '../../../utils'

export interface ICheckoutService<S> {
  atualizaStatusPedidoPago (codigo: number): Promise<Either<string, boolean>>

  checkoutQrCode (codigoPedido: number): Promise<Either<string, S>>
}
