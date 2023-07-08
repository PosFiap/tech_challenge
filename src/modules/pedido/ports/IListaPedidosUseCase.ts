import { ItemListaPedidoOutputDTO } from '../dto/ListaPedidoOutputDTO'
import { IPedidoRegistry } from './IPedidoRegistry'

export interface IListaPedidosUseCase {
  listaPedidos(repository: IPedidoRegistry): Promise<ItemListaPedidoOutputDTO[]>
}

