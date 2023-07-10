import { RegistraClienteDTO, RegistraClienteOutputDTO } from '../dto/RegistraClienteDTO'
import { AtualizaClienteDTO, AtualizaClienteOutputDTO } from '../dto/AtualizaClienteDTO'
import { ListaClientesOutputDTO } from '../dto/ListaClientesDTO'
import { DeletaClienteDTO, DeletaClienteOutputDTO } from "../dto/DeletaClienteDTO";
import { BuscaClienteDTO, BuscaClienteOutputDTO } from "../dto/BuscaClienteDTO";

export interface IRegistraClienteUseCase {
  registraCliente(cliente: RegistraClienteDTO): Promise<RegistraClienteOutputDTO>
}
export interface IAtualizaClienteUseCase {
  atualizaCliente(cliente: AtualizaClienteDTO): Promise<AtualizaClienteOutputDTO>
}
export interface IListaClientesUseCase {
  listaCliente(): Promise<ListaClientesOutputDTO>
}
export interface IBuscaClienteCPFUseCase {
    buscaClienteCPF(data: BuscaClienteDTO): Promise<BuscaClienteOutputDTO>
}

export interface IDeletaClienteUseCase {
  deletaCliente(data: DeletaClienteDTO): Promise<DeletaClienteOutputDTO> // DTO-DELETE
}
