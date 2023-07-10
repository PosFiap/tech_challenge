import { IClienteRepository } from './IClienteRepository'
import {
  IAtualizaClienteUseCase,
  IRegistraClienteUseCase,
  IListaClientesUseCase,
  IListaClienteCPFUseCase,
  IDeletaClienteUseCase
} from './IRegistraClienteUseCase'

export interface IClienteService extends
  IRegistraClienteUseCase,
  IAtualizaClienteUseCase,
  IListaClientesUseCase,
  IListaClienteCPFUseCase,
  IDeletaClienteUseCase {
  clienteRepository: IClienteRepository
}
