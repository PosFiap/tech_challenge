import { Cliente } from '../../modules/cliente/entities/Cliente'
import { ClienteRegistryDTO } from '../../modules/cliente'
import { IClienteRepository } from '../../modules/cliente/ports/IClienteRegistry'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ClienteRepository implements IClienteRepository {
  async insereCliente (cliente: Cliente): Promise<ClienteRegistryDTO> {
    try {
      const data = {
        cpf: cliente.cpf,
        email: cliente.email,
        nome: cliente.nome
      }
      const register = await prisma.cliente.create({ data })
      return register
    } catch (err) {
      console.error('Erro ao cadastrar cliente!')
      throw err
    }
  }
}
