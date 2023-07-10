import { IClienteRepository } from './IClienteRepository'
import {
    IAtualizaClienteUseCase,
    IRegistraClienteUseCase,
    IDeletaClienteUseCase,
    IBuscaClienteCPFUseCase,
    IListaClientesUseCase
} from "./IRegistraClienteUseCase";

export interface IClienteService extends 
    IRegistraClienteUseCase, 
    IAtualizaClienteUseCase,
    IBuscaClienteCPFUseCase,
    IListaClientesUseCase,
    IDeletaClienteUseCase
{
    clienteRepository: IClienteRepository;
}
