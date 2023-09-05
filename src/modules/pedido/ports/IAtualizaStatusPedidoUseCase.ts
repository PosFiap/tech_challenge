import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO } from '../dto'
import { IPedidoRepositoryGateway } from './IPedidoRepository'

export interface IAtualizaStatusPedidoUseCase {
  atualizaStatus(data: AtualizaStatusPedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO>
}
