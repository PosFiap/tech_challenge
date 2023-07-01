import { ClienteDTO, ClienteRegistryDTO, ErrorDTO} from "../dto";
import { IClienteRepository } from "./IClienteRegistry";

export interface IRegistraClienteUseCase {
    registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO | ErrorDTO>
}
export interface IAtualizaClienteUseCase {
    atualizaCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO>
}
export interface IListaClienteUseCase {
    listaCliente(clienteRepository: IClienteRepository): Promise<Array<ClienteRegistryDTO>>
}
export interface IListaClienteCPFUseCase {
    listaClienteCPF(cpf:string, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO | null>
}
export interface IDeletaClienteUseCase {
    deletaCliente(codigo:number, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO>
}