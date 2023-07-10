import { AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO, InserePedidoOutputDTO } from '../../modules/pedido'

export interface IPedidoController {
  pedidoService: IPedidoService

  moveStatusEmPreparacao(data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusPronto(data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusFinalizado(data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO>
  listaPedidos(): Promise<ItemListaPedidoOutputDTO[]>
  registraPedido(data: { cpf: string | null, produtoPedido: Array<{ codigo: number }> }): Promise<InserePedidoOutputDTO>
}
