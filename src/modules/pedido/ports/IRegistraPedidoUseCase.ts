import { InserePedidoDTO } from '../dto/InserePedidoDTO'
import { InserePedidoOutputDTO } from '../dto/InserePedidoOutputDTO'

export interface IRegistraPedidoUseCase {
  registraPedido(data: InserePedidoDTO): Promise<InserePedidoOutputDTO>
}
