import { PedidoService } from "../../modules/pedido/PedidoService";
import { PedidoDTO } from "../../modules/pedido/dto/PedidoDTO";
import { PedidoOutputDTO } from "../../modules/pedido/dto/PedidoOutputDTO";
import { PedidoRepository } from "../persistence/PedidoRepository";
import { ProdutoRepository } from "../persistence/ProdutoRepository";

export class PedidoAdapter {
    registraPedido(pedido: PedidoDTO): PedidoOutputDTO {
        const pedidoRegistry = new PedidoRepository();
        const produtoRegistry = new ProdutoRepository();
        const service = new PedidoService();

        console.log('pedido recebido', pedido);

        const pedidoCompleto = service.registraPedido(pedido, pedidoRegistry, produtoRegistry);

        console.log('pedido completo', pedidoCompleto);

        return pedidoCompleto;
    }
}