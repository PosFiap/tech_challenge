import { ItemListaPedidoAndamentoOutputDTO } from '../dto/ListaPedidoOutputDTO'
import { IPedidoRepositoryGateway } from './IPedidoRepository'

export interface IListaPedidosUseCase {
  listaPedidosAndamento(pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoAndamentoOutputDTO[]>
}
