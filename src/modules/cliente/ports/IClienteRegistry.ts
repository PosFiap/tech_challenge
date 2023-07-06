import { Cliente } from "../entities/Cliente";
import { ClienteRegistryDTO, ErrorDTO } from '../index'

export interface IClienteRepository {
    insereCliente(cliente: Cliente): Promise<ClienteRegistryDTO>
    atualizaCliente(cliente: Cliente): Promise<ClienteRegistryDTO>
    listaCliente(): Promise<Array<ClienteRegistryDTO>>
    listaClienteCPF(cpf: string): Promise<ClienteRegistryDTO | null>
    deletaCliente(cpf: string): Promise<ClienteRegistryDTO>
}