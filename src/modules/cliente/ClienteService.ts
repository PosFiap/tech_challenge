import { ClienteDTO, ClienteRegistryDTO } from "./dto";
import { IRegistraClienteUseCase, IAtualizaClienteUseCase, IListaClienteUseCase, IDeletaClienteUseCase, IListaClienteCPFUseCase } from "./ports";
import { IClienteRepository } from "./ports/IClienteRegistry";

export class ClienteService implements IRegistraClienteUseCase, IAtualizaClienteUseCase, IListaClienteUseCase, IDeletaClienteUseCase, IListaClienteCPFUseCase {
  
    async registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO> {
        const result = await clienteRepository.insereCliente(cliente);
        return result
    }
    async atualizaCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO> {
        const result = await clienteRepository.atualizaCliente(cliente);
        return result
    }
    async listaCliente(clienteRepository: IClienteRepository): Promise<Array<ClienteRegistryDTO>> {
        const result = await clienteRepository.listaCliente();
        return result
    }
    async listaClienteCPF(cpf: string, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO | null> {
        const result = await clienteRepository.listaClienteCPF(cpf);
        return result
    }
    async deletaCliente(cpf: string, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO> {
        const result = await clienteRepository.deletaCliente(cpf);
        return result
    }
}