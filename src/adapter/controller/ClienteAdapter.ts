import { ClienteDTO, ClienteRegistryDTO, ClienteService } from '../../modules/cliente'
import { ClienteRepository } from '../persistence/ClienteRepository'

export class ClienteAdapter {
  async registraCliente (cliente: ClienteDTO): Promise<ClienteRegistryDTO> {
    const clienteService = new ClienteService()
    const clienteRepository = new ClienteRepository()
    const result = await clienteService.registraCliente(cliente, clienteRepository)
    return result
  }
}
