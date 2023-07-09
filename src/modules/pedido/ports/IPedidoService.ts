import { IAtualizaStatusPedidoUseCase } from "./IAtualizaStatusPedidoUseCase";
import { IListaPedidosUseCase } from "./IListaPedidosUseCase";
import { IPedidoRepository } from "./IPedidoRepository";
import { IRegistraPedidoUseCase } from "./IRegistraPedidoUseCase";

export interface IPedidoService extends IRegistraPedidoUseCase, IListaPedidosUseCase, IAtualizaStatusPedidoUseCase {
    pedidoRepository?: IPedidoRepository;
}