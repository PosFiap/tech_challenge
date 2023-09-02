import { InserePedidoDTO } from '../dto/InserePedidoDTO'
import { InserePedidoOutputDTO } from '../dto/InserePedidoOutputDTO'
import { IPedidoRepositoryGateway } from './IPedidoRepository'

export interface IRegistraPedidoUseCase {
  registraPedido(data: InserePedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<InserePedidoOutputDTO>
}
