import { PedidoOutputDTO } from '../../modules/pedido/dto/PedidoOutputDTO'
import { PedidoRepository } from '../persistence/PedidoRepository'
import { ProdutoRepository } from '../persistence/ProdutoRepository'
import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO, ItemListaPedidoOutputDTO, PedidoDTO, PedidoService } from './../../modules/pedido'

export class PedidoAdapter {
  async atualizaStatusPedido (data: AtualizaStatusPedidoDTO): Promise<AtualizaStatusPedidoOutputDTO> {
    const pedidoRepository = new PedidoRepository()
    const pedidoService = new PedidoService(pedidoRepository)
    try {
      const result = pedidoService.atualizaStatus(data)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedidos (): Promise<ItemListaPedidoOutputDTO[]> {
    try {
      const pedidoRepository = new PedidoRepository()
      const pedidoService = new PedidoService(pedidoRepository)
      return pedidoService.listaPedidos()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async registraPedido (pedido: PedidoDTO): Promise<PedidoOutputDTO> {
    const pedidoRegistry = new PedidoRepository()
    const produtoRegistry = new ProdutoRepository()
    const service = new PedidoService(pedidoRegistry)

    try {
      const pedidoCompleto = await service.registraPedido(pedido, produtoRegistry)
      return pedidoCompleto
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
