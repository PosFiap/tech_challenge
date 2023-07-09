import { IClienteRepository } from "./IClienteRepository";
import { IRegistraClienteUseCase } from "./IRegistraClienteUseCase";

export interface IClienteService extends IRegistraClienteUseCase{
    clienteRepository: IClienteRepository;
}