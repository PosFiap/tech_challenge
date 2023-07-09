import { AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO, InserePedidoOutputDTO } from '../../modules/pedido'

export interface IPedidoController {
  pedidoService: IPedidoService

  atualizaStatusPedido(data: { codigoPedido: number, codigoStatus: number }): Promise<AtualizaStatusPedidoOutputDTO>

  listaPedidos(): Promise<ItemListaPedidoOutputDTO[]>

  registraPedido(data: { cpf: string | null, produtoPedido: Array<{ codigo: number }> }): Promise<InserePedidoOutputDTO>
}
