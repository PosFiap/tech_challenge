import { AtualizaStatusPedidoOutputDTO, IPedidoRepositoryGateway, IPedidoUseCases, ItemListaPedidoOutputDTO } from '../../../modules/pedido'
import { IPedidoDetalhadoPresenterJSONFormat } from '../../presenter/interfaces/IPedidoDetalhadoPresenter'
import { IPedidoDetalhadoPresenterFactory } from '../../presenter/interfaces/IPedidoDetalhadoPresenterFactory'

export interface IPedidoController {

  pedidoService: IPedidoUseCases

  moveStatusEmPreparacao(
    data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusPronto(data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusFinalizado(data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  listaPedidos(
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<ItemListaPedidoOutputDTO[]>

  registraPedido(
    data: { cpf: string | null, produtoPedido: Array<{ codigo: number }> },
    pedidoDetalhadoPresenterFactory: IPedidoDetalhadoPresenterFactory,
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<Object>
}
