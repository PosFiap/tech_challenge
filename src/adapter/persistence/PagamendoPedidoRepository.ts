import { PrismaClient } from '@prisma/client'
import { EStatus } from '../../modules/common/value-objects/EStatus'
import { PedidoPagamentoDTO } from '../../modules/pagamento/dto/PedidoPagamentoDTO'
import { IPagamentoPedidoRepository } from '../../modules/pagamento/ports/IPedidoRegistry'
import { CustomError, CustomErrorType } from '../../utils'

export class PagamentoPedidoRepository implements IPagamentoPedidoRepository {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async atualizarStatusPedidoPago (codigo: number, status: EStatus): Promise<boolean> {
    try {
      await this.prisma.pedido.update({
        data: {
          status
        },
        where: {
          codigo
        }
      })
      return true
    } catch (error) {
      console.error('Erro no atualizar status', error)
      throw error
    }
  }

  async obterPedidoPeloCodigo (codigo: number): Promise<PedidoPagamentoDTO> {
    const pedido: any = await this.prisma.pedido.findUnique({
      where: {
        codigo
      },
      include: {
        ProdutoPedido: {
          include: { Produto: true }
        }
      }
    } as any)

    if (!pedido) throw new CustomError(
      CustomErrorType.RepositoryDataNotFound,
      'Pedido não encontrado'
    )

    return {
      codigo: pedido.codigo,
      status: pedido.status,
      itensDePedido: pedido.ProdutoPedido.map((produtoPedido: { Produto: any, valor: number }) => {
        const { Produto: produto } = produtoPedido
        return {
          codigo: produto.codigo,
          nome: produto.nome,
          descricao: produto.descricao,
          valor: produtoPedido.valor,
          categoria_codigo: produto.categoria_codigo
        }
      })
    }
  }
}
