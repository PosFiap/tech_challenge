import { RegistraClienteDTO, RegistraClienteOutputDTO } from "./dto/RegistraClienteDTO";
import { AtualizaClienteDTO, AtualizaClienteOutputDTO } from "./dto/AtualizaClienteDTO";
import { ClienteEntity } from "./entity/ClienteEntity";
import { ClienteAtualizaEntity } from "./entity/ClienteAtualizaEntity"
import { Cliente } from "./model/Cliente";
import { IClienteRepository } from "./ports/IClienteRepository";
import { IClienteService } from "./ports/IClienteService";
import { ItemListaCliente, ListaClienteDTO, ListaClientesOutputDTO } from "./dto/ListaClientesDTO";
import { DeletaClienteDTO, DeletaClienteOutputDTO } from './dto/DeletaClienteDTO'
import { BuscaClienteDTO, BuscaClienteOutputDTO } from "./dto/BuscaClienteDTO";

export class ClienteService implements IClienteService {
  
    constructor(
        readonly clienteRepository: IClienteRepository
    ){}

    async registraCliente(data: RegistraClienteDTO): Promise<RegistraClienteOutputDTO> {
        
        const cliente = new Cliente(data.CPF!, data.nome, data.email);

        const clienteEntity: ClienteEntity = {
            cpf: cliente.CPF!,
            email: cliente.email,
            nome: cliente.nome
        }

        const result = await this.clienteRepository.insereCliente(clienteEntity);
        
        return new RegistraClienteOutputDTO(
            result.cpf,
            result.email,
            result.nome
        );
    }

    async atualizaCliente(data: AtualizaClienteDTO): Promise<AtualizaClienteOutputDTO> {
        const cliente = new Cliente(data.CPF, data.email, data.nome)
        const clienteAtualiza: ClienteAtualizaEntity = {
            cpf: cliente.CPF,
            nome: cliente.nome,
            email: cliente.email
        }

        const result = await this.clienteRepository.atualizaCliente(clienteAtualiza);
        return new AtualizaClienteOutputDTO(result.cpf, result.email, result.nome);
    }
    async listaCliente(): Promise<ListaClientesOutputDTO> {
        const clientes = await this.clienteRepository.listaCliente()        
        return new ListaClientesOutputDTO(
            clientes.map((cliente) => new ItemListaCliente(cliente.cpf, cliente.email, cliente.nome))
        )
    }

    async buscaClienteCPF(data: BuscaClienteDTO): Promise<BuscaClienteOutputDTO> {
        const cliente = await this.clienteRepository.listaClienteCPF(data.CPF)
        return new BuscaClienteOutputDTO(cliente.cpf, cliente.email, cliente.nome);
    }

    async deletaCliente(data: DeletaClienteDTO): Promise<DeletaClienteOutputDTO> {//DTO-DELETE        
        const result = await this.clienteRepository.deletaCliente(data.CPF);
        return result
    }
}