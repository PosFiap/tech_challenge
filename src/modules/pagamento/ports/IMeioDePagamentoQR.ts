export interface IMeioDePagamentoQR<T, S> {
  checkoutQrCode(pedido: T): Promise<S>
}
