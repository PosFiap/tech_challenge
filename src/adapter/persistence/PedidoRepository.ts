import { IPedidoRegistry } from "../../modules/pedido";
import { ItemDePedido } from "../../modules/pedido/entities/ItemDePedido";
import { Pedido } from "../../modules/pedido/entities/Pedido";

const bancoDeDados: Array<Pedido> = [
    new Pedido(null, 0, [], 1000),
    new Pedido(null, 1, [], 1001),
    new Pedido("1234", 0, [
        new ItemDePedido("x-salada", "", 12.90, 0),
        new ItemDePedido("coquinha", "", 6.10, 2)
    ], 1002),


];

export class  PedidoRepository implements IPedidoRegistry {
    async listaPedidos(): Promise<Pedido[]> {
        return bancoDeDados;
    }

    registraPedido(pedido: Pedido): Pedido {
        const codigo = bancoDeDados.push(pedido) + 1000;
        return new Pedido(
            pedido.CPF,
            pedido.status,
            pedido.itensDePedido,
            codigo
        );
    }

}