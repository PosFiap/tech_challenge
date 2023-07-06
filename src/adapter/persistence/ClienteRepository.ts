import { Cliente } from '../../modules/cliente/entities/Cliente'
import { IClienteRepository } from '../../modules/cliente/ports/IClienteRegistry'

const bancoDeDados = []

export class ClienteRepository implements IClienteRepository {
  insereCliente (cliente: Cliente): number {
    return bancoDeDados.push(cliente)
  }
}
