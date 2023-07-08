import { ClienteDTO } from "./dto";
import { IRegistraClienteUseCase } from "./ports";
import { IClienteRepository } from "./ports/IClienteRegistry";

export class ClienteService implements IRegistraClienteUseCase {
    registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): number {
        return clienteRepository.insereCliente(cliente);
    }
}