export interface IMeioDePagamento {
  checkoutQrCode(fatura: any): Promise<string>
}
