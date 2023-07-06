import { EStatus } from '../entities/EStatus'

export interface PedidoOutputDTO {
  status: EStatus
  codigo: number
  valor: number
}
