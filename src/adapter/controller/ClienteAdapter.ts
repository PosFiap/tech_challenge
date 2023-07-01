import { ClienteDTO, ClienteRegistryDTO, ErrorDTO, ClienteService } from "../../modules/cliente";
import { ClienteRepository } from "../persistence/ClienteRepository";

export class ClienteAdapter {
    async registraCliente(cliente: ClienteDTO): Promise<ClienteRegistryDTO | ErrorDTO> {
        const clienteService = new ClienteService();
        const clienteRepository = new ClienteRepository();
        const result = await clienteService.registraCliente(cliente, clienteRepository);
        return result;
    }
    
    async atualizaCliente(cliente: ClienteDTO): Promise<ClienteRegistryDTO> {
        const clienteService = new ClienteService();
        const clienteRepository = new ClienteRepository();
        const result = await clienteService.atualizaCliente(cliente, clienteRepository);
        return result;
    }

    async listaCliente(): Promise<Array<ClienteRegistryDTO>> {
        const clienteService = new ClienteService();
        const clienteRepository = new ClienteRepository();
        const result = await clienteService.listaCliente(clienteRepository);
        return result;
    }
    
    async listaClienteCPF(cpf: string): Promise<ClienteRegistryDTO | null> {
        const clienteService = new ClienteService();
        const clienteRepository = new ClienteRepository();
        const result = await clienteService.listaClienteCPF(cpf, clienteRepository);        
        return result;
    }
    
    async deletaCliente(codigo: number): Promise<ClienteRegistryDTO> {
        const clienteService = new ClienteService();
        const clienteRepository = new ClienteRepository();
        const result = await clienteService.deletaCliente(codigo, clienteRepository);
        return result;
    }
}