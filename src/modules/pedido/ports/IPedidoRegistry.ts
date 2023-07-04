import { Pedido } from "../entities/Pedido";

export interface IPedidoRegistry {
    registraPedido(pedido: Pedido): Pedido;
    listaPedidos(): Promise<Array<Pedido>>;
}