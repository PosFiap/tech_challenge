import { ItemListaPedidoOutputDTO } from '../dto/ListaPedidoOutputDTO'

export interface IListaPedidosUseCase {
  listaPedidos(): Promise<ItemListaPedidoOutputDTO[]>
}
