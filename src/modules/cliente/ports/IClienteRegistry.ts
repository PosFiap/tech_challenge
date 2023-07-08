import { Cliente } from "../entities/Cliente";
import { ClienteRegistryDTO } from '../index'

export interface IClienteRepository {
    insereCliente(cliente: Cliente): Promise<ClienteRegistryDTO>
}