import { ClienteAtualizaEntity } from '../entity/ClienteAtualizaEntity'
import { ClienteEntity } from '../entity/ClienteEntity'
import { ClienteListaCpfEntity } from '../entity/ClienteListaCpfEntity'
import { ClienteListaEntity } from '../entity/ClienteListaEntity'

export interface IClienteRepository {
  insereCliente(cliente: ClienteEntity): Promise<ClienteEntity>
  atualizaCliente(cliente: ClienteAtualizaEntity): Promise<ClienteAtualizaEntity>
  listaCliente(): Promise<ClienteListaEntity[]>
  listaClienteCPF(cpf: string): Promise<ClienteListaCpfEntity>
  deletaCliente(cpf: string): Promise<any> // DTO-DELETE
}
