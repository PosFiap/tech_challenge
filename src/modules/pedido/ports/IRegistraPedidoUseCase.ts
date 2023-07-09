import { IProdutoRepository } from "../../produto/ports/IProdutoRegistry";
import { PedidoDTO } from "../dto/PedidoDTO";
import { PedidoOutputDTO } from "../dto/PedidoOutputDTO";
import { IPedidoRegistry } from "./IPedidoRegistry";

export interface IRegistraPedidoUseCase {

    registraPedido(data: PedidoDTO, produtoRegistry: IProdutoRepository): Promise<PedidoOutputDTO>;

}