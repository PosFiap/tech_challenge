import { IProdutoRepository } from "../../produto/ports/IProdutoRepository";
import { InserePedidoDTO } from "../dto/InserePedidoDTO";
import { InserePedidoOutputDTO } from "../dto/InserePedidoOutputDTO";
import { IPedidoRepository } from "./IPedidoRepository";

export interface IRegistraPedidoUseCase {
    registraPedido(data: InserePedidoDTO): Promise<InserePedidoOutputDTO>;
}