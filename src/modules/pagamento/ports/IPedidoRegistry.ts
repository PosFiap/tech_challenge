import { EStatus } from '../../common/value-objects/EStatus'
import { PedidoPagamentoDTO } from '../dto'

export interface IPagamentoPedidoRepository {
  obterPedidoPeloCodigo(codigo: number): Promise<PedidoPagamentoDTO>
  atualizarStatusPedidoPago(codigo: number, status: EStatus): Promise<boolean>
}
