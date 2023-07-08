import { Cliente } from "../entities/Cliente";
import { ClienteRepositoryDTO } from '../index'

export interface IClienteRepository {
    insereCliente(cliente: Cliente): Promise<ClienteRepositoryDTO>
}