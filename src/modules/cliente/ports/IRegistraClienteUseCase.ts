import { RegistraClienteDTO, RegistraClienteOutputDTO } from "../dto/RegistraClienteDTO";
import { AtualizaClienteDTO, AtualizaClienteOutputDTO } from "../dto/AtualizaClienteDTO";
import { ListaClientesOutputDTO } from '../dto/ListaClientesDTO'
import { ListaClienteDTO, ListaClienteOutputDTO } from "../dto/ListaClienteDTO";
import { DeletaClienteDTO, DeletaClienteOutputDTO } from "../dto/DeletaClienteDTO";

export interface IRegistraClienteUseCase {
    registraCliente(cliente: RegistraClienteDTO): Promise<RegistraClienteOutputDTO>
}
export interface IAtualizaClienteUseCase {
    atualizaCliente(cliente: AtualizaClienteDTO): Promise<AtualizaClienteOutputDTO>
}
export interface IListaClientesUseCase {
    listaCliente(): Promise<ListaClientesOutputDTO>
}
export interface IListaClienteCPFUseCase {
    listaClienteCPF(data: ListaClienteDTO): Promise<ListaClienteOutputDTO>
}

export interface IDeletaClienteUseCase {
    deletaCliente(data: DeletaClienteDTO): Promise<DeletaClienteOutputDTO> //DTO-DELETE
}