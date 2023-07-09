import { ClienteDTO, ClienteRepositoryDTO, ClienteService } from "../../modules/cliente";
import { ClienteRepository } from "../persistence/ClienteRepository";

export class ClienteAdapter {
    async registraCliente(cliente: ClienteDTO): Promise<ClienteRepositoryDTO> {
        const clienteService = new ClienteService();
        const clienteRepository = new ClienteRepository();
        const result = await clienteService.registraCliente(cliente, clienteRepository);
        return result;
    }
}