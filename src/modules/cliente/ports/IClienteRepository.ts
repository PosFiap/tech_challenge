import { Cliente } from '../entities/Cliente'

export interface IClienteRepository {
  insereCliente(cliente: Cliente): Promise<Cliente>
}
