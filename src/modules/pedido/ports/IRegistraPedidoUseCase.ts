import { IProdutoRepository } from "../../produto/ports/IProdutoRepository";
import { PedidoDTO } from "../dto/PedidoDTO";
import { PedidoOutputDTO } from "../dto/PedidoOutputDTO";
import { IPedidoRepository } from "./IPedidoRepository";

export interface IRegistraPedidoUseCase {
    registraPedido(data: PedidoDTO): Promise<PedidoOutputDTO>;
}