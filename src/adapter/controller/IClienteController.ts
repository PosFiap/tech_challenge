import { RegistraClienteOutputDTO } from "../../modules/cliente/dto/RegistraClienteDTO";
import { AtualizaClienteOutputDTO } from "../../modules/cliente/dto/AtualizaClienteDTO";
import { ListaClientesOutputDTO } from "../../modules/cliente/dto/ListaClientesDTO";
import { DeletaClienteOutputDTO } from "../../modules/cliente/dto/DeletaClienteDTO";
import { IClienteService } from "../../modules/cliente/ports/IClienteService";
import { BuscaClienteOutputDTO } from "../../modules/cliente/dto/BuscaClienteDTO";

export interface IClienteController {
  clienteService: IClienteService

    registraCliente(data: {CPF: string, nome: string, email: string}): Promise<RegistraClienteOutputDTO>;
    atualizaCliente(data: {CPF: string, nome: string, email: string}): Promise<AtualizaClienteOutputDTO>;
    listaCliente(): Promise<ListaClientesOutputDTO>;
    buscaClienteCPF(cpf: string): Promise<BuscaClienteOutputDTO>,
    deletaCliente(cpf: string): Promise<DeletaClienteOutputDTO>
}
