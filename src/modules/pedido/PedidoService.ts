import { IProdutoRegistry } from '../produto/ports/IProdutoRegistry'
import { PedidoDTO } from './dto/PedidoDTO'
import { PedidoOutputDTO } from './dto/PedidoOutputDTO'
import { EStatus } from './entities/EStatus'
import { Pedido } from './entities/Pedido'
import { IPedidoRegistry, IRegistraPedidoUseCase } from './ports'

export class PedidoService implements IRegistraPedidoUseCase {
  registraPedido (pedido: PedidoDTO, pedidoRegistry: IPedidoRegistry, produtoRegistry: IProdutoRegistry): PedidoOutputDTO {
    const itensDePedidoCompletos = pedido.ItemDePedido.map(({ codigo }) => {
      return produtoRegistry.buscaProdutoPorCodigo(codigo)
    })

    console.log('itens de pedido completos', itensDePedidoCompletos)

    const pedidoInserido = pedidoRegistry.registraPedido(new Pedido(
      pedido.CPF,
      EStatus['Aguardando Pagamento'],
      itensDePedidoCompletos
    ))

    return {
      codigo: pedidoInserido.codigo as number,
      status: pedidoInserido.status,
      valor: pedidoInserido.itensDePedido.reduce((soma, item) => soma + item.valor, 0)
    }
  }
}
