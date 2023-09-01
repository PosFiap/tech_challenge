import { EStatus } from '../../../modules/common/value-objects/EStatus';
import { IPedidoDetalhadoPresenter, IProdutoPedidoDetalhadoPresenter } from './IPedidoDetalhadoPresenter';

export interface IPedidoDetalhadoPresenterFactory {
  create(
    status: EStatus,
    codigoPedido: number,
    itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
    CPFCliente?: string
  ): IPedidoDetalhadoPresenter
}