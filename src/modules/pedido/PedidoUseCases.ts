import { AtualizaStatusPedidoOutputDTO } from './dto/AtualizaStatusPedidoOutputDTO'
import { ItemListaPedidoAndamentoOutputDTO, ItemProdutoListaPedidoAndamentoOutputDTO } from './dto/ListaPedidoOutputDTO'
import { InserePedidoDTO } from './dto/InserePedidoDTO'
import { InserePedidoOutputDTO } from './dto/InserePedidoOutputDTO'
import { ECategoria } from '../common/value-objects/ECategoria'
import { EStatus } from '../common/value-objects/EStatus'
import { Pedido } from './model/Pedido'
import { AtualizaStatusPedidoDTO } from './dto'
import { CustomError, CustomErrorType } from '../../utils/customError'
import { Produto } from './model/Produto'
import { IPedidoRepositoryGateway, IPedidoUseCases } from './ports'
import { CPF } from '../common/value-objects'

export class PedidoUseCases implements IPedidoUseCases {
  
  async enviaPedido(data: AtualizaStatusPedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO> {
    const { codigoPedido } = data;
    let pedidoAtualizado;

    try {
      const pedido = await pedidoRepositoryGateway.obtemPedido(codigoPedido);
      pedido.atualizaStatus(EStatus.Recebido);
      pedidoAtualizado = await pedidoRepositoryGateway.atualizaPedido(pedido);
    } catch (err) {
      if (err instanceof CustomError) throw err
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message)
    }

    return new AtualizaStatusPedidoOutputDTO(
      pedidoAtualizado.codigo!,
      EStatus[pedidoAtualizado.status],
      pedidoAtualizado.status
    )
  }

  async atualizaStatus (data: AtualizaStatusPedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO> {
    data.validaDTO()

    const { codigoPedido, codigoStatus } = data
    let pedidoAtualizado

    try {
      const pedido = await pedidoRepositoryGateway.obtemPedido(codigoPedido)
      pedido.atualizaStatus(codigoStatus)
      pedidoAtualizado = await pedidoRepositoryGateway.atualizaPedido(pedido)
    } catch (err) {
      if (err instanceof CustomError) throw err
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message)
    }

    return new AtualizaStatusPedidoOutputDTO(
      pedidoAtualizado.codigo!,
      EStatus[pedidoAtualizado.status],
      pedidoAtualizado.status
    )
  }

  async listaPedidosAndamento (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoAndamentoOutputDTO[]> {
    const pedidosArmazenados = await pedidoRepositoryGateway.listaPedidos({
      vinculaProdutos: true
    })

    const listaPedidos: ItemListaPedidoAndamentoOutputDTO[] =
            pedidosArmazenados.map((pedido: Pedido) => {
              const produtosPedido: ItemProdutoListaPedidoAndamentoOutputDTO[] =
                    pedido.produtosPedido.map(produtosPedido => {
                      return new ItemProdutoListaPedidoAndamentoOutputDTO(
                        produtosPedido.nome,
                        produtosPedido.valor,
                        ECategoria[produtosPedido.categoria_codigo]
                      )
                    })

              return new ItemListaPedidoAndamentoOutputDTO(
                pedido.status,
                pedido.codigo!,
                pedido.CPF,
                pedido.dataPedido!,
                produtosPedido
              )
            });

    return listaPedidos;
  }

  async registraPedido (data: InserePedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<InserePedidoOutputDTO> {
    let pedidoInserido: Pedido
    let itensDePedidoCompletos = [];

    try {
      // busca o produto para ter a informação de valor
      itensDePedidoCompletos = await Promise.all(
        data.produtosPedidoCodigo.map(async ({ codigo }) => {
          const produto: Produto = await pedidoRepositoryGateway.buscaProdutoPorCodigo(codigo)
          if (!produto) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Item de pedido não encontrado')
          return produto
        })
      )

      pedidoInserido = await pedidoRepositoryGateway.registraPedido(new Pedido(
        data.CPF,
        EStatus['Aguardando Pagamento'],
        itensDePedidoCompletos,
        null,
        null
      ));

    } catch (err) {
      if (err instanceof CustomError) throw err
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message)
    }

    return new InserePedidoOutputDTO(
      pedidoInserido.status,
      pedidoInserido.codigo!,
      pedidoInserido.valorTotal,
      pedidoInserido.CPF ? new CPF(pedidoInserido.CPF) : null,
      pedidoInserido.dataPedido!,
      itensDePedidoCompletos
    )
  }
}
