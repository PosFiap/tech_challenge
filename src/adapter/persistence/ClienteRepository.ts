import { Cliente } from "../../modules/cliente/entities/Cliente";
import { ClienteRepositoryDTO } from '../../modules/cliente'
import { IClienteRepository } from "../../modules/cliente/ports/IClienteRepository";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ClienteRepository implements IClienteRepository {
    async insereCliente(cliente: Cliente): Promise<ClienteRepositoryDTO> {
        try {
            const data = {
                cpf: cliente.cpf,
                email: cliente.email,
                nome: cliente.nome
            }
            const register = await prisma.cliente.create({ data })
            return register
        } catch (err) {
            throw(err)
        }
    }

}