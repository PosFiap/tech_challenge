import {EStatus} from '../../../modules/common/value-objects/EStatus';

export interface IPedidoDetalhadoPresenter {
  status: EStatus,
  codigoPedido: number,
  CPFCliente?: string,
  itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
  format(): Object
}

export interface IProdutoPedidoDetalhadoPresenter {
  nome: string,
  valor: number,
}

export interface IPedidoDetalhadoPresenterJSON extends IPedidoDetalhadoPresenter {}

export interface IPedidoDetalhadoPresenterJSONFormat {
  status: string,
  numero_pedido: string,
  CPF_cliente?: string,
  valor_total: string,
  itens_pedido: Array<{
    nome: string,
    valor: string
  }>
}