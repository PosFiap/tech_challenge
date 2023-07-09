import { Cliente } from "../../modules/cliente/model/Cliente";
import { ClienteRegistryDTO } from '../../modules/cliente'
import { CustomError, CustomErrorType } from "../../utils/customError";
import { isValidCPF } from "../../utils/isValidCPF";

import { PrismaClient } from '@prisma/client'
import { IClienteRepository } from "../../modules/cliente/ports/IClienteRepository";
import { ClienteEntity } from "../../modules/cliente/entity/ClienteEntity";
const prisma = new PrismaClient()

export class PrismaClienteRepository implements IClienteRepository {

    async insereCliente(cliente: ClienteEntity): Promise<ClienteEntity> {

      if(!cliente.cpf) throw new CustomError(CustomErrorType.EntityViolation, "CPF obrigatório");

      const user = await prisma.cliente.findUnique({ where: {cpf: cliente.cpf}});
      
      if(user) throw new CustomError(CustomErrorType.BusinessRuleViolation, "Usuário já cadastrado");
      
      const data = {
          cpf: cliente.cpf,
          email: cliente.email,
          nome: cliente.nome
      };

      const register = await prisma.cliente.create({ data });

      return {
        cpf: register.cpf,
        email: register.email!,
        nome: register.nome!
      }
    }
    
    /*async atualizaCliente(cliente: Cliente): Promise<ClienteRegistryDTO> {
      const data = cliente
      if(!isValidCPF(cliente.cpf)) throw new CustomError(CustomErrorType.BusinessRuleViolation, "CPF inválido");
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
      if(!isValidCPF(cpf)) throw new CustomError(CustomErrorType.BusinessRuleViolation, "CPF inválido");
      const listUnique = await prisma.cliente.findUnique({ where: {cpf}})
      if(!listUnique) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Usuário não encontrado");
      return listUnique
    }

    async deletaCliente(cpf: string): Promise<ClienteRegistryDTO> {
      if(!isValidCPF(cpf)) throw new CustomError(CustomErrorType.BusinessRuleViolation, "CPF inválido");
      const user = await this.listaClienteCPF(cpf)      
      if(!user) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Usuário não encontrado");
      const deleted = await prisma.cliente.delete({ where: { cpf }})
      return deleted
    }*/
}