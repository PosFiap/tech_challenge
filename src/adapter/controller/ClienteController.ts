import { ClienteService } from "../../modules/cliente";

import { AtualizaClienteDTO, AtualizaClienteOutputDTO } from "../../modules/cliente/dto/AtualizaClienteDTO";
import { RegistraClienteDTO, RegistraClienteOutputDTO } from "../../modules/cliente/dto/RegistraClienteDTO";
import { ListaClienteDTO, ListaClientesOutputDTO } from "../../modules/cliente/dto/ListaClientesDTO";
import { DeletaClienteDTO, DeletaClienteOutputDTO } from "../../modules/cliente/dto/DeletaClienteDTO";

import { IClienteService } from "../../modules/cliente/ports/IClienteService";
import { PrismaClienteRepository } from "../persistence/ClienteRepository";
import { IClienteController } from "./IClienteController";
import { BuscaClienteDTO, BuscaClienteOutputDTO } from "../../modules/cliente/dto/BuscaClienteDTO";

export class ClienteController implements IClienteController {
    private constructor(
        readonly clienteService: IClienteService
    ){}

    static create(configuration:string = 'default'): ClienteController {
        if(configuration === 'default') {
            const repository = new PrismaClienteRepository();
            const service = new ClienteService(repository);
            return new ClienteController(service);
        }
        throw new Error('Invalid Configuration Setup');
    }

    async registraCliente(data: {CPF: string, nome: string, email: string}): Promise<RegistraClienteOutputDTO> {
        try {
            const clienteDTO = new RegistraClienteDTO(
                data.CPF,
                data.email,
                data.nome
            )
            return this.clienteService.registraCliente(clienteDTO);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    
    async atualizaCliente(data: {CPF: string, nome: string, email: string}): Promise<AtualizaClienteOutputDTO> {
        try {
            const clienteDTO = new AtualizaClienteDTO(data.CPF, data.email, data.nome)
            return this.clienteService.atualizaCliente(clienteDTO)
        } catch (err) {
            console.error(err);
            throw err;            
        }
    }

    async listaCliente(): Promise<ListaClientesOutputDTO> {
        try {
            return this.clienteService.listaCliente()
        } catch (err) {
            console.error(err)
            throw err
        }
    }
    
    async buscaClienteCPF(cpf: string): Promise<BuscaClienteOutputDTO> {
       try {
            const cliente = new BuscaClienteDTO(cpf)
            const result = await this.clienteService.buscaClienteCPF(cliente);        
            return result;
       } catch (err) {
            console.error(err)
            throw err
       }
    }
    
    async deletaCliente(cpf: string): Promise<DeletaClienteOutputDTO> {
        try {
            const cliente = new DeletaClienteDTO(cpf)
            const result = await this.clienteService.deletaCliente(cliente);
            return result;
        } catch (err) {
            console.error(err)
            throw err            
        }
    }
}