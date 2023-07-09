import { ClienteDTO } from "../dto";
import { IClienteRepository } from "./IClienteRepository";

export interface IRegistraClienteUseCase {
    registraCliente(cliente: ClienteDTO, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO>
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
    deletaCliente(cpf: string, clienteRepository: IClienteRepository): Promise<ClienteRegistryDTO>
}