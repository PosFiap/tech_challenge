import { IPedidoRegistry } from "../../modules/pedido";
import { Pedido } from "../../modules/pedido/entities/Pedido";

const bancoDeDados = [];

export class  PedidoRepository implements IPedidoRegistry {
    registraPedido(pedido: Pedido): Pedido {
        const codigo = bancoDeDados.push(pedido) + 1000;
        pedido.codigo = codigo;
        return pedido;
    }

}