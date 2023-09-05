import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
// @ts-ignore
import * as fakerBr from 'faker-br'
import { EStatus } from '../modules/common/value-objects/EStatus'
import { ECategoria } from '../modules/common/value-objects/ECategoria'

const prisma = new PrismaClient()

const checkDataBaseEmptiness = async () => {
  const empty = (await prisma.produto.count()) === 0;
  return empty;
}

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max) || 1
}

const getStatus = (): number => {
  return Math.floor(Math.random() * (EStatus.__LENGTH - 1))
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

/*
const getCategoria = (): number => {
  return Math.floor(Math.random() * Object.keys(ECategoria).length - 1)
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
} */

const geraProdutos = () => {
  const produtos = [];
  produtos.push({
    data: {
      nome: 'Nc Lanche Feliz',
      descricao: 'Lanche para as crianças do Neverwinter & Cia',
      valor: 8.90,
      categoria_codigo: ECategoria.Lanche
    }
  },{
    data: {
      nome: 'Big Nc',
      descricao: 'O favorito da galera',
      valor: 12.90,
      categoria_codigo: ECategoria.Lanche
    }
  },{
    data: {
      nome: 'NcFlurry Oreo',
      descricao: 'Sorvete de baunilha com cobertura de Oreo',
      valor: 5.90,
      categoria_codigo: ECategoria.Sobremesa
    }
  },{
    data: {
      nome: 'Milkfake Ovomaltine',
      descricao: 'Milkshake que finge ser de ovomaltine',
      valor: 6.90,
      categoria_codigo: ECategoria.Sobremesa
    }
  },{
    data: {
      nome: 'Coquinha',
      descricao: 'Uma coquinha no grau pra aliviar o calor',
      valor: 3.49,
      categoria_codigo: ECategoria.Bebida
    }
  },{
    data: {
      nome: 'Coquinha Zero',
      descricao: 'Uma coquinha no grau pra aliviar o calor, só que engordando menos',
      valor: 4.00,
      categoria_codigo: ECategoria.Bebida
    }
  },{
    data: {
      nome: 'Batata Fritas Média',
      descricao: 'Fritas da casa',
      valor: 6.10,
      categoria_codigo: ECategoria.Acompanhamento
    }
  },{
    data: {
      nome: 'Onion Rings',
      descricao: 'Cebolinha da casa',
      valor: 7.50,
      categoria_codigo: ECategoria.Acompanhamento
    }
  });
  return produtos;
};

export const main = async (): Promise<void> => {

  if(!(await checkDataBaseEmptiness())) return;

  let produtos = geraProdutos();

  for(let i = 0; i < produtos.length; i++) {
    // const codigo = getProductId()
    const res = await prisma.produto.create(produtos[i]);

    // @ts-ignore
    produtos[i].codigo = res.codigo;
  }    

  for  (let i = 0; i < 10; i++) {
    const cliente = getCliente()
    await prisma.cliente.upsert(cliente)

    const status = getStatus();
    await prisma.pedido.upsert({
      where: { codigo: i },
      update: {},
      create: {
        status,
        cpf_cliente: cliente.where.cpf,
        ProdutoPedido: {
          createMany: {
            data: produtos.slice(Math.random() * (produtos.length - 1)).map(produto => ({
                valor_produto: produto.data.valor,
              // @ts-ignore
                produto_codigo: produto.codigo
            }))
          }
        },
        Fatura: {
          create: {
            situacao: status > 0 ? 1 : 0,
            codigo: `PAG-${Date.now()}`
          }
        }
      }
    })
  }
}

// main()
//   .then(() => {
//     console.log('Seed concluido')
//   })
//   .catch(err => {
//     console.error(err)
//     process.exit(1)
//   })
