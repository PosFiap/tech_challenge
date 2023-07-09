import { RegistraClienteDTO, RegistraClienteOutputDTO } from "./dto/RegistraClienteDTO";
import { ClienteEntity } from "./entity/ClienteEntity";
import { Cliente } from "./model/Cliente";
import { IClienteRepository } from "./ports/IClienteRepository";
import { IClienteService } from "./ports/IClienteService";

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

    /*async atualizaCliente(cliente: ClienteDTO): Promise<ClienteRegistryDTO> {
        const result = await this.clienteRepository.atualizaCliente(cliente);
        return result
    }
    async listaCliente(): Promise<Array<ClienteRegistryDTO>> {
        const result = await this.clienteRepository.listaCliente();
        return result
    }
    async listaClienteCPF(cpf: string): Promise<ClienteRegistryDTO | null> {
        const result = await this.clienteRepository.listaClienteCPF(cpf);
        return result
    }
    async deletaCliente(cpf: string): Promise<ClienteRegistryDTO> {
        const result = await this.clienteRepository.deletaCliente(cpf);
        return result
    }*/
}