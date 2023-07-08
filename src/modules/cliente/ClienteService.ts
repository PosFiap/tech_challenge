import { ClienteDTO, ClienteRepositoryDTO } from "./dto";
import { IRegistraClienteUseCase } from "./ports";
import { IClienteRepository } from "./ports/IClienteRepository";

export class ClienteService implements IRegistraClienteUseCase {
    async registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRepositoryDTO> {
        const result = await clienteRepository.insereCliente(cliente);
        return result
    }
}