import { EStatus } from '../../modules/common/value-objects/EStatus'
import { PedidoPagamentoDTO } from '../../modules/pagamento/dto/PedidoPagamentoDTO'
import { IPagamentoPedidoRegistry } from '../../modules/pagamento/ports/IPedidoRegistry'

const bancoDeDados: Array<Record<string, any>> = []

export class PagamentoPedidoRepository implements IPagamentoPedidoRegistry {
  async atualizarStatusPedidoPago (codigo: number, status: EStatus): Promise<boolean> {
    bancoDeDados[codigo].status = status
    return true
  }

  async obterPedidoPeloCodigo (codigo: number): Promise<PedidoPagamentoDTO> {
    const pedido = bancoDeDados[codigo]
    return {
      codigo: pedido.codigo,
      status: pedido.status,
      itensDePedido: pedido.itensDePedido
    }
  }
}
