import { ClienteEntity } from "../entity/ClienteEntity";

export interface IClienteRepository {
    insereCliente(cliente: ClienteEntity): Promise<ClienteEntity>
}