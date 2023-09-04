import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO } from '../dto'
import { IAtualizaStatusPedidoUseCase } from './IAtualizaStatusPedidoUseCase'
import { IListaPedidosUseCase } from './IListaPedidosUseCase'
import { IPedidoRepositoryGateway } from './IPedidoRepository'
import { IRegistraPedidoUseCase } from './IRegistraPedidoUseCase'

export interface IPedidoUseCases extends IRegistraPedidoUseCase, IListaPedidosUseCase, IAtualizaStatusPedidoUseCase {

    enviaPedido(data: AtualizaStatusPedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO>

}
