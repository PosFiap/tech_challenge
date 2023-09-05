import { PrismaClient } from '@prisma/client'
import { EStatus } from '../../../modules/common/value-objects/EStatus'
import { PedidoPagamentoDTO } from '../../../modules/pagamento/dto/PedidoPagamentoDTO'
import { IPagamentoRepositoryGateway } from '../../../modules/pagamento/ports/IPagamentoRegistryGateway'
import { CustomError, CustomErrorType } from '../../../utils'
import { EStatusPagamento } from '../../../modules/common/value-objects'
import { Fatura, Pedido } from '../../../modules/pagamento/model'

type FaturaEntity = {
  codigo: string,
  data_criacao: Date,
  data_atualizacao: Date,
  situacao: number,
  Pedido: PedidoEntity
}

type PedidoEntity = {
  codigo: number,
  status: string,
  cpf_cliente: string | null
}

export class PrismaPagamentoRepositoryGateway implements IPagamentoRepositoryGateway {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async criaFatura(codigo_fatura: string, codigo_pedido: number): Promise<Fatura> {
    const faturaInserida = await this.prisma.fatura.create({
      data: {
        codigo: codigo_fatura,
        situacao: EStatusPagamento['Aguardando Pagamento'],
        pedido_codigo: codigo_pedido
      },
      select: {
        codigo: true,
        data_atualizacao: true,
        data_criacao: true,
        situacao: true,
        Pedido: {
          select: {
            codigo: true,
            cpf_cliente: true,
            status: true
          }
        }
      }
    })

    return new Fatura(
      faturaInserida.codigo,
      faturaInserida.situacao,
      faturaInserida.data_criacao,
      faturaInserida.data_atualizacao,
      new Pedido(faturaInserida.Pedido.codigo, faturaInserida.Pedido.cpf_cliente)
    )
  }

  async obtemFaturaPorCodigo(fatura_id: string): Promise<Fatura> {
    const fatura = (await this.prisma.fatura.findUnique({
      where: {
        codigo: fatura_id
      },
      include: {
        Pedido: true
      }
    })) as unknown as FaturaEntity

    return new Fatura(
      fatura.codigo,
      fatura.situacao,
      fatura.data_criacao,
      fatura.data_atualizacao,
      new Pedido(
        fatura.Pedido.codigo,
        fatura.Pedido.cpf_cliente
      )
    );
  }

  async atualizarStatusFatura(fatura_id: string, statusPagamento: EStatusPagamento): Promise<Fatura> {
    try {
      const situacao = statusPagamento;
      await this.prisma.fatura.update({
        data: {
          situacao
        },
        where: {
          codigo: fatura_id
        }
      });

      return this.obtemFaturaPorCodigo(fatura_id);

    } catch (error) {
      console.error('Erro no atualizar status', error)
      throw error
    }
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
