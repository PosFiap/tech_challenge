import { ItemListaPedidoOutputDTO } from "../dto/ListaPedidoOutputDTO";
import { IPedidoRepository } from "./IPedidoRepository";

export interface IListaPedidosUseCase {
    listaPedidos(repository: IPedidoRepository): Promise<Array<ItemListaPedidoOutputDTO>>;
}