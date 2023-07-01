import { Cliente } from "../entities/Cliente";
import { ClienteRegistryDTO, ErrorDTO } from '../index'

export interface IClienteRepository {
    insereCliente(cliente: Cliente): Promise<ClienteRegistryDTO | ErrorDTO>
    atualizaCliente(cliente: Cliente): Promise<ClienteRegistryDTO>
    listaCliente(): Promise<Array<ClienteRegistryDTO>>
    listaClienteCPF(cpf: string): Promise<ClienteRegistryDTO | null>
    deletaCliente(codigo: number): Promise<ClienteRegistryDTO>
}