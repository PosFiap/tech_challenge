import { AtualizaStatusPedidoOutputDTO } from './dto/AtualizaStatusPedidoOutputDTO'
import { ItemListaPedidoOutputDTO, ItemPedidoListaPedidoOutputDTO } from './dto/ListaPedidoOutputDTO'
import { InserePedidoDTO } from './dto/InserePedidoDTO'
import { InserePedidoOutputDTO } from './dto/InserePedidoOutputDTO'
import { ECategoria } from '../common/value-objects/ECategoria'
import { EStatus } from '../common/value-objects/EStatus'
import { Pedido } from './model/Pedido'
import { AtualizaStatusPedidoDTO } from './dto'
import { CustomError, CustomErrorType } from '../../utils/customError'
import { Produto } from './model/Produto'
import { IPedidoRepository, IPedidoService } from './ports'

export class PedidoService implements IPedidoService {
  constructor (readonly pedidoRepository: IPedidoRepository) {}

  async atualizaStatus (data: AtualizaStatusPedidoDTO): Promise<AtualizaStatusPedidoOutputDTO> {
    data.validaDTO()

    const { codigoPedido, codigoStatus } = data
    let pedidoAtualizado

    try {
      const pedido = await this.pedidoRepository.obtemPedido(codigoPedido)
      pedido.atualizaStatus(codigoStatus)
      pedidoAtualizado = await this.pedidoRepository.atualizaPedido(pedido)
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

  async listaPedidos (): Promise<ItemListaPedidoOutputDTO[]> {
    const pedidosArmazenados = await this.pedidoRepository.listaPedidos({
      vinculaProdutos: true
    })

    const listaPedidos: ItemListaPedidoOutputDTO[] =
            pedidosArmazenados.map((pedido: Pedido) => {
              const produtosPedido: ItemPedidoListaPedidoOutputDTO[] =
                    pedido.produtosPedido.map(produtosPedido => {
                      return new ItemPedidoListaPedidoOutputDTO(
                        produtosPedido.nome,
                        produtosPedido.valor,
                        ECategoria[produtosPedido.categoria_codigo]
                      )
                    })

              return new ItemListaPedidoOutputDTO(
                EStatus[pedido.status],
                pedido.codigo!,
                pedido.CPF,
                produtosPedido
              )
            })
    return listaPedidos
  }

  async registraPedido (data: InserePedidoDTO): Promise<InserePedidoOutputDTO> {
    let pedidoInserido: Pedido
    let itensDePedidoCompletos = [];

    try {
      // busca o produto para ter a informação de valor
      itensDePedidoCompletos = await Promise.all(
        data.produtosPedidoCodigo.map(async ({ codigo }) => {
          const produto: Produto = await this.pedidoRepository.buscaProdutoPorCodigo(codigo)
          if (!produto) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Item de pedido não encontrado')
          return produto
        })
      )

      pedidoInserido = await this.pedidoRepository.registraPedido(new Pedido(
        data.CPF,
        EStatus['Aguardando Pagamento'],
        itensDePedidoCompletos,
        null
      ))
    } catch (err) {
      if (err instanceof CustomError) throw err
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message)
    }

    console.log(pedidoInserido)

    return new InserePedidoOutputDTO(
      pedidoInserido.status,
      pedidoInserido.codigo!,
      pedidoInserido.valorTotal,
      itensDePedidoCompletos
    )
  }
}
