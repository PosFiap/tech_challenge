import { RegistraClienteOutputDTO } from "../../modules/cliente/dto/RegistraClienteDTO";
import { IClienteService } from "../../modules/cliente/ports/IClienteService";

export interface IClienteController {
    clienteService: IClienteService;

    registraCliente(data: {CPF: string, nome: string, email: string}): Promise<RegistraClienteOutputDTO>;

}