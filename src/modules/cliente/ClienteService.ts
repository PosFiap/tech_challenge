import { ClienteDTO, ClienteRegistryDTO } from './dto'
import { IRegistraClienteUseCase } from './ports'
import { IClienteRepository } from './ports/IClienteRegistry'

export class ClienteService implements IRegistraClienteUseCase {
  async registraCliente (cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO> {
    const result = await clienteRepository.insereCliente(cliente)
    return result
  }
}
