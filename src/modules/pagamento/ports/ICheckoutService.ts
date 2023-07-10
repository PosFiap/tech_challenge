export interface ICheckoutService<S> {
  atualizaStatusPedidoPago (codigo: number): Promise<boolean>

  checkoutQrCode (codigoPedido: number): Promise<S>
}
