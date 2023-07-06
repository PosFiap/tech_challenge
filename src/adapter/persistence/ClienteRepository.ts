import { Cliente } from "../../modules/cliente/entities/Cliente";
import { ClienteRegistryDTO } from '../../modules/cliente'
import { IClienteRepository } from "../../modules/cliente/ports/IClienteRegistry";
import { CustomError, CustomErrorType } from "../../utils/customError";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ClienteRepository implements IClienteRepository {
    async insereCliente(cliente: Cliente): Promise<ClienteRegistryDTO> {
      const user = await prisma.cliente.findUnique({ where: {cpf: cliente.cpf}})
      if(user) throw new CustomError(CustomErrorType.BusinessRuleViolation, "Usuário já cadastrado");
      
      const data = {
          cpf: cliente.cpf,
          email: cliente.email,
          nome: cliente.nome
      }
      const register = await prisma.cliente.create({ data })
      return register
    }
    
    async atualizaCliente(cliente: Cliente): Promise<ClienteRegistryDTO> {
      const data = cliente
      const user = await this.listaClienteCPF(cliente.cpf)      
      if(!user) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Usuário não encontrado");
      const update = await prisma.cliente.update({ data, where: { cpf: data.cpf }})
      return update
    }
    
    async listaCliente(): Promise<Array<ClienteRegistryDTO>> {
        try {
            const list = await prisma.cliente.findMany()
            return list
        } catch (err) {
            throw(err)
        }
    }
    
    async listaClienteCPF(cpf: string): Promise<ClienteRegistryDTO | null> {
      const listUnique = await prisma.cliente.findUnique({ where: {cpf}})
      if(!listUnique) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Usuário não encontrado");
      return listUnique
    }

    async deletaCliente(cpf: string): Promise<ClienteRegistryDTO> {
      const user = await this.listaClienteCPF(cpf)      
      if(!user) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Usuário não encontrado");
      const deleted = await prisma.cliente.delete({ where: { cpf }})
      return deleted
    }

}