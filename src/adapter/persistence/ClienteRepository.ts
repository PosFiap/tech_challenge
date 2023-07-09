import { Cliente } from '../../modules/cliente/entities/Cliente'
import { IClienteRepository } from '../../modules/cliente/ports/IClienteRepository'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ClienteRepository implements IClienteRepository {
  async insereCliente (cliente: Cliente): Promise<Cliente> {
    try {
      const data = {
        cpf: cliente.cpf,
        email: cliente.email,
        nome: cliente.nome
      }
      const register = await prisma.cliente.create({ data }) as Cliente
      return register
    } catch (err) {
      console.error(err)
      throw (err)
    }
  }
}
