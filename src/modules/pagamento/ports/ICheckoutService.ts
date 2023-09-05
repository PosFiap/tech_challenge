import { IPagamentoRepositoryGateway } from "./IPagamentoRegistryGateway"
import { IPagamentoUseCases } from "./IPagamentoUseCases"

export interface ICheckoutService<S> extends IPagamentoUseCases {
  atualizaStatusPedidoPago (codigo: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<boolean>

  checkoutQrCode (codigoPedido: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<S>
}
