import { PedidoOutputDTO } from "../../modules/pedido/dto/PedidoOutputDTO";
import { PedidoRepository } from "../persistence/PedidoRepository";
import { ProdutoRepository } from "../persistence/ProdutoRepository";
import { ItemListaPedidoOutputDTO, PedidoDTO, PedidoService } from "./../../modules/pedido";

export class PedidoAdapter {
    listaPedidos(): Promise<Array<ItemListaPedidoOutputDTO>> {
        try{
            const pedidoRepository = new PedidoRepository();
            const pedidoService = new PedidoService(pedidoRepository);
            return pedidoService.listaPedidos();
        } catch(err) {
            throw err;
        }
    }

    registraPedido(pedido: PedidoDTO): PedidoOutputDTO {
        const pedidoRegistry = new PedidoRepository();
        const produtoRegistry = new ProdutoRepository();
        const service = new PedidoService(pedidoRegistry);

        console.log('pedido recebido', pedido);

        const pedidoCompleto = service.registraPedido(pedido, pedidoRegistry, produtoRegistry);

        console.log('pedido completo', pedidoCompleto);

        return pedidoCompleto;
    }
}