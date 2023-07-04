import { ClienteDTO } from "./dto";
import { IRegistraClienteUseCase } from "./ports";
import { IClienteRepository } from "./ports/IClienteRegistry";

export class ClienteService implements IRegistraClienteUseCase {
    registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): number {
        console.log('cliente', cliente);
        return clienteRepository.insereCliente(cliente);
    }
}