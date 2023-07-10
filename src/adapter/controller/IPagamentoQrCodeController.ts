export interface IPagamentoQrCodeController {
  gerarPagamentoQrCode (codigoPedido: number): Promise<string>
}
