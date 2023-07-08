import { Cliente } from '../entities/Cliente'
import { ClienteRegistryDTO } from '../dto'

export interface IClienteRepository {
  insereCliente(cliente: Cliente): Promise<ClienteRegistryDTO>
}
