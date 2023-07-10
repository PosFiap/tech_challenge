import { EStatus } from '../../common/value-objects/EStatus'
import { PedidoPagamentoDTO } from '../dto'

export interface IPagamentoPedidoRegistry {
  obterPedidoPeloCodigo(codigo: number): Promise<PedidoPagamentoDTO>
  atualizarStatusPedidoPago(codigo: number, status: EStatus): Promise<boolean>
}
