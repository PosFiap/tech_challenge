import { ClienteService } from "../../modules/cliente";
import { RegistraClienteDTO, RegistraClienteOutputDTO } from "../../modules/cliente/dto/RegistraClienteDTO";
import { IClienteService } from "../../modules/cliente/ports/IClienteService";
import { PrismaClienteRepository } from "../persistence/ClienteRepository";
import { IClienteController } from "./IClienteController";

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
    
    /*async atualizaCliente(cliente: ClienteDTO): Promise<ClienteRegistryDTO> {
        const clienteService = new ClienteService();
        const clienteRepository = new PrismaClienteRepository();
        const result = await clienteService.atualizaCliente(cliente, clienteRepository);
        return result;
    }

    async listaCliente(): Promise<Array<ClienteRegistryDTO>> {
        const clienteService = new ClienteService();
        const clienteRepository = new PrismaClienteRepository();
        const result = await clienteService.listaCliente(clienteRepository);
        return result;
    }
    
    async listaClienteCPF(cpf: string): Promise<ClienteRegistryDTO | null> {
        const clienteService = new ClienteService();
        const clienteRepository = new PrismaClienteRepository();
        const result = await clienteService.listaClienteCPF(cpf, clienteRepository);        
        return result;
    }
    
    async deletaCliente(cpf: string): Promise<ClienteRegistryDTO> {
        const clienteService = new ClienteService();
        const clienteRepository = new PrismaClienteRepository();
        const result = await clienteService.deletaCliente(cpf, clienteRepository);
        return result;
    }*/
}