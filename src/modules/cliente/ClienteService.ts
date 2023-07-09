import { ClienteDTO } from "./dto";
import { ClienteOuputDTO } from "./dto/ClienteDTO";
import { IRegistraClienteUseCase } from "./ports";
import { IClienteRepository } from "./ports/IClienteRepository";

export class ClienteService implements IRegistraClienteUseCase {
    async registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteOuputDTO> {
        const result = await clienteRepository.insereCliente(cliente);
        return new ClienteOuputDTO(cliente.cpf, cliente.email, cliente.nome);
    }
}