import { ItemListaPedidoOutputDTO } from '../dto/ListaPedidoOutputDTO'
import { IPedidoRepositoryGateway } from './IPedidoRepository'

export interface IListaPedidosUseCase {
  listaPedidos(pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoOutputDTO[]>
}
