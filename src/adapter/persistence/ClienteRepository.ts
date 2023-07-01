import { Cliente } from "../../modules/cliente/entities/Cliente";
import { ClienteRegistryDTO, ErrorDTO } from '../../modules/cliente'
import { IClienteRepository } from "../../modules/cliente/ports/IClienteRegistry";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ClienteRepository implements IClienteRepository {
    async insereCliente(cliente: Cliente): Promise<ClienteRegistryDTO | ErrorDTO> {
        try {
            const user = await this.listaClienteCPF(cliente.cpf)
            if (user) throw new Error()
            
            const data = {
                cpf: cliente.cpf,
                email: cliente.email,
                nome: cliente.nome
            }
            const register = await prisma.cliente.create({ data })
            return register
        } catch (err) {
          return { menssagem: 'Usuário já registrado'}
        }
    }
    
    async atualizaCliente(cliente: Cliente): Promise<ClienteRegistryDTO> {
        try {
            const data = cliente
            const update = await prisma.cliente.update({ data, where: { codigo: data.codigo }})
            return update
        } catch (err) {
            throw(err)
        }
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
        try {
            const listUnique = await prisma.cliente.findUnique({ where: {cpf}})
            return listUnique
        } catch (err) {
            throw(err)
        }
    }
    async deletaCliente(codigo: number): Promise<ClienteRegistryDTO> {
        try {
            const deleted = await prisma.cliente.delete({ where: { codigo }})
            return deleted
        } catch (err) {
            throw(err)
        }
    }

}