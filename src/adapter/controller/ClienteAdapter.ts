import { ClienteDTO, ClienteService } from '../../modules/cliente'
import { ClienteRepository } from '../persistence/ClienteRepository'

export class ClienteAdapter {
  registraCliente (cliente: ClienteDTO): number {
    const clienteService = new ClienteService()
    const clienteRepository = new ClienteRepository()
    const result = clienteService.registraCliente(cliente, clienteRepository)
    return result
  }
}
