import { Pedido } from "../entities/Pedido";

export interface IPedidoRegistry {
    obtemStatusPedido(codigoPedido: number): Promise<number>;
    atualizaStatusPedido(codigoPedido: number, codigoStatus: number): Promise<Pedido>;
    registraPedido(pedido: Pedido): Pedido;
    listaPedidos(): Promise<Array<Pedido>>;
}