import { CustomError, CustomErrorType } from '../../utils/customError'
import { isValidCPF } from '../../utils/isValidCPF'

import { PrismaClient } from '@prisma/client'

import { IClienteRepository } from '../../modules/cliente/ports/IClienteRepository'
import { ClienteEntity } from '../../modules/cliente/entity/ClienteEntity'
import { ClienteAtualizaEntity } from '../../modules/cliente/entity/ClienteAtualizaEntity'
import { ClienteListaEntity } from '../../modules/cliente/entity/ClienteListaEntity'
import { ClienteListaCpfEntity } from '../../modules/cliente/entity/ClienteListaCpfEntity'
import { ClienteDeletaEntity } from '../../modules/cliente/entity/ClienteDeletaEntity'

const prisma = new PrismaClient()

export class PrismaClienteRepository implements IClienteRepository {
  async insereCliente (cliente: ClienteEntity): Promise<ClienteEntity> {
    if (!cliente.cpf) throw new CustomError(CustomErrorType.EntityViolation, 'CPF obrigatório')

    const user = await prisma.cliente.findUnique({ where: { cpf: cliente.cpf } })

    if (user) throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Usuário já cadastrado')

    const data = {
      cpf: cliente.cpf,
      email: cliente.email,
      nome: cliente.nome
    }

    const register = await prisma.cliente.create({ data })

    return {
      cpf: register.cpf,
      email: register.email!,
      nome: register.nome!
    }
  }

  async atualizaCliente (cliente: ClienteAtualizaEntity): Promise<ClienteAtualizaEntity> {
    if (!isValidCPF(cliente.cpf)) throw new CustomError(CustomErrorType.BusinessRuleViolation, 'CPF inválido')

    const user = await prisma.cliente.findUnique({ where: { cpf: cliente.cpf } })

    if (!user) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Usuário não encontrado')

    const data = {
      email: cliente.email,
      nome: cliente.nome
    }

    const update = await prisma.cliente.update({ data, where: { cpf: cliente.cpf } })

    return {
      cpf: update.cpf,
      email: update.email!,
      nome: update.nome!
    }
  }

  async listaCliente (): Promise<ClienteListaEntity[]> {
    const list = await prisma.cliente.findMany()
    return list.map(item => ({ cpf: item.cpf, nome: item.nome!, email: item.email! }))
  }

  async listaClienteCPF (cpf: string): Promise<ClienteListaCpfEntity> {
    if (!isValidCPF(cpf)) throw new CustomError(CustomErrorType.BusinessRuleViolation, 'CPF inválido')

    const listUnique = await prisma.cliente.findUnique({ where: { cpf } })

    if (!listUnique) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Usuário não encontrado')

    return {
      nome: listUnique.nome!,
      cpf: listUnique.cpf,
      email: listUnique.email!
    }
  }

  async deletaCliente (cpf: string): Promise<ClienteDeletaEntity> { // DTO-DELETE
    if (!isValidCPF(cpf)) throw new CustomError(CustomErrorType.EntityViolation, 'CPF inválido')
    const user = await this.listaClienteCPF(cpf)
    if (!user) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Usuário não encontrado')

    const deleted = await prisma.cliente.delete({ where: { cpf } })
    return {
      email: deleted.email!,
      cpf: deleted.cpf,
      nome: deleted.nome!
    }
  }
}
