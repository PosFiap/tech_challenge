import { IProdutoRepository } from "../../produto/ports/IProdutoRegistry";
import { PedidoDTO } from "../dto/PedidoDTO";
import { PedidoOutputDTO } from "../dto/PedidoOutputDTO";
import { IPedidoRegistry } from "./IPedidoRegistry";

export interface IRegistraPedidoUseCase {
    registraPedido(pedido: PedidoDTO, pedidoRegistry: IPedidoRegistry, produtoRegistry: IProdutoRepository): PedidoOutputDTO;
}