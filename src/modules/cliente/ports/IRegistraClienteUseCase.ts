import { ClienteDTO, ClienteRepositoryDTO} from "../dto";
import { IClienteRepository } from "./IClienteRepository";

export interface IRegistraClienteUseCase {
    registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRepositoryDTO>
}