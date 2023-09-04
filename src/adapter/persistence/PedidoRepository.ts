import { PrismaClient } from '@prisma/client'
import { IPedidoRepositoryGateway } from '../../modules/pedido'
import { Pedido } from '../../modules/pedido/model/Pedido'
import { Produto } from '../../modules/pedido/model/Produto'
import { EStatus } from '../../modules/common/value-objects'

export class PrismaPedidoRepositoryGateway implements IPedidoRepositoryGateway {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async registraPedido (pedido: Pedido): Promise<Pedido> {
    const pedidoInserido = await this.prisma.pedido.create({
      data: {
        status: pedido.status,
        cpf_cliente: pedido.CPF,
        ProdutoPedido: {
          createMany: {
            data: pedido.produtosPedido.map((produto) => ({
              valor_produto: produto.valor,
              produto_codigo: parseInt(produto.codigo),
              observacoes: null
            }))
          }
        }
      }
    })

    return new Pedido(
      pedidoInserido.cpf_cliente,
      pedidoInserido.status,
      pedido.produtosPedido,
      pedidoInserido.codigo,
      (pedidoInserido as any).data_criacao
    )
  }

  async listaPedidos (config: { vinculaProdutos: boolean }): Promise<Pedido[]> {
    const options = {
      where: {
        OR: [
          {
            status: EStatus.Pronto
          },
          {
            status: EStatus['Em preparação']
          },
          {
            status: EStatus.Recebido
          }
        ]
      },
      orderBy: [
        {
          status: 'desc',
        },
        {
          data_criacao: 'asc',
        },
      ],
      include: {} 
    }
    if (config.vinculaProdutos) {
      options.include = {
        ProdutoPedido: {
          include: {
            Produto: true
          }
        }
      }
    }
    //@ts-ignore
    const pedidos = await this.prisma.pedido.findMany(options)

    return pedidos.map((pedido: any) => (new Pedido(
      pedido.cpf_cliente!,
      pedido.status!,
      pedido.ProdutoPedido.map((produtoPedido: { Produto: Produto, valor: number }) => {
        const { Produto: produto } = produtoPedido
        return new Produto(
          produto.codigo,
          produto.nome,
          produto.descricao,
          // @ts-expect-error
          produtoPedido.valor_produto,
          produto.categoria_codigo
        )
      }),
      pedido.codigo,
      pedido.data_criacao
    )))
  }

  async atualizaPedido (pedido: Pedido): Promise<Pedido> {
    const pedidoAtualizado = await this.prisma.pedido.update({
      data: {
        status: pedido.status
      },
      where: {
        codigo: pedido.codigo!
      }
    })
    return new Pedido(
      pedidoAtualizado.cpf_cliente,
      pedidoAtualizado.status!,
      [],
      pedidoAtualizado.codigo
    )
  }

  async obtemPedido (codigoPedido: number): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: {
        codigo: codigoPedido
      }
    })
    return new Pedido(
      pedido?.cpf_cliente ?? null,
      pedido?.status!,
      [],
      pedido?.codigo!
    )
  }

  async buscaProdutoPorCodigo (codigoProduto: number): Promise<Produto> {
    const produto = await this.prisma.produto.findUnique({
      where: {
        codigo: codigoProduto
      }
    })
    return new Produto(
      produto?.codigo!.toString()!,
      produto?.nome!,
      produto?.descricao!,
      produto?.valor!,
      produto?.categoria_codigo!
    )
  }
}
