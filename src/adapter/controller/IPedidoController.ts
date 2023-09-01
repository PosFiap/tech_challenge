import { AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO } from '../../modules/pedido'
import { IPedidoDetalhadoPresenterJSONFormat } from '../presenter/interfaces/IPedidoDetalhadoPresenter'
import { IPedidoDetalhadoPresenterFactory } from '../presenter/interfaces/IPedidoDetalhadoPresenterFactory'

export interface IPedidoController {

  pedidoService: IPedidoService

  moveStatusEmPreparacao(data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusPronto(data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusFinalizado(data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO>
  listaPedidos(): Promise<ItemListaPedidoOutputDTO[]>

  registraPedido(data: { cpf: string | null, produtoPedido: Array<{ codigo: number }> },pedidoDetalhadoPresenterFactory: IPedidoDetalhadoPresenterFactory): Promise<IPedidoDetalhadoPresenterJSONFormat>
}
