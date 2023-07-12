import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
// @ts-ignore
import * as fakerBr from 'faker-br'
import { EStatus } from '../modules/common/value-objects/EStatus'
import { ECategoria } from '../modules/common/value-objects/ECategoria'

const prisma = new PrismaClient()

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max) || 1
}

const getStatus = (): number => {
  return Math.floor(Math.random() * EStatus.__LENGTH - 1)
}

const getCategoria = (): number => {
  return Math.floor(Math.random() * Object.keys(ECategoria).length - 1)
}

const getCliente = () => {
  const cpf = fakerBr.br.cpf()
  return {
      where: { cpf },
      update: {},
      create: {
        email: faker.internet.email(),
        cpf,
        nome: faker.person.fullName()
      }
    }
}

const productIds = Object.keys(new Array(500).fill(null))

const getProductId = (): number => {
  return parseInt(productIds.splice(getRandomNumber(productIds.length), 1)[0], 10)
}

const getProduto = () => {
  faker.seed(getRandomNumber(100))
  return {
    nome: faker.commerce.productName(),
    valor: parseFloat(faker.commerce.price({min: 10, max: 100 })),
    descricao: faker.commerce.productDescription(),
    categoria_codigo: getCategoria()
  }
}

const main = async (): Promise<void> => {
  for (let i = 0; i < 10; i++) {
    const cliente = getCliente()
    await prisma.cliente.upsert(cliente)

    let produtos = []
  
    for (let i = 0; i < getRandomNumber(2); i++) {
      produtos.push(getProduto())
    }

    for(let i = 0; i < produtos.length; i++) {
      // const codigo = getProductId()
      const res = await prisma.produto.create({
        data: produtos[i]
      })

      // @ts-ignore
      produtos[i].codigo = res.codigo
    }    

    await prisma.pedido.upsert({
      where: { codigo: i },
      update: {},
      create: {
        status: getStatus(),
        cpf_cliente: cliente.where.cpf,
        ProdutoPedido: {
          createMany: {
            data: produtos.map(produto => ({
                observacoes: faker.commerce.productDescription(),
                valor_produto: produto.valor,
              // @ts-ignore
                produto_codigo: produto.codigo
            }))
          }
        }
      }
    })
  }
}

main()
  .then(() => {
    console.log('Seed concluido')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
