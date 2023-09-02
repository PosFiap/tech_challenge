import { IAtualizaStatusPedidoUseCase } from './IAtualizaStatusPedidoUseCase'
import { IListaPedidosUseCase } from './IListaPedidosUseCase'
import { IPedidoRepositoryGateway } from './IPedidoRepository'
import { IRegistraPedidoUseCase } from './IRegistraPedidoUseCase'

export interface IPedidoUseCases extends IRegistraPedidoUseCase, IListaPedidosUseCase, IAtualizaStatusPedidoUseCase {
}
