import { IProdutoRegistry } from '../../produto/ports/IProdutoRegistry'
import { PedidoDTO } from '../dto/PedidoDTO'
import { PedidoOutputDTO } from '../dto/PedidoOutputDTO'

export interface IRegistraPedidoUseCase {
  registraPedido(data: PedidoDTO, produtoRegistry: IProdutoRegistry): Promise<PedidoOutputDTO>
}
