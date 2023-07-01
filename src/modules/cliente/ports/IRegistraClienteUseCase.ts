import { ClienteDTO, ClienteRegistryDTO} from "../dto";
import { IClienteRepository } from "./IClienteRegistry";

export interface IRegistraClienteUseCase {
    registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO>
}