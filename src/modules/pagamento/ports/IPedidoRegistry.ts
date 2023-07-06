import { EStatus, PedidoPagamentoDTO } from '../dto'

export interface IPagamentoPedidoRegistry {
  obterPedidoPeloCodigo(codigo: number): Promise<PedidoPagamentoDTO>
  atualizarStatusPedidoPago(codigo: number, status: EStatus): Promise<boolean>
}
