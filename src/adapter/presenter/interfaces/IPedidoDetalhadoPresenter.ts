import {EStatus} from '../../../modules/common/value-objects/EStatus';
import { CPF } from '../implementations/value-objects/CPF';

export interface IPedidoDetalhadoPresenter {
  status: EStatus,
  codigoPedido: number,
  CPFCliente?: string
  itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
  dataPedido: Date,
  codigoFatura?: string,
  format(): Object
}

export interface IProdutoPedidoDetalhadoPresenter {
  nome: string,
  valor: number,
}

export interface IPedidoDetalhadoPresenterJSON extends IPedidoDetalhadoPresenter {}

export interface IPedidoDetalhadoPresenterJSONFormat {
  status: string,
  codigo_fatura?: string,
  data: string,
  CPF_cliente?: string,
  numero_pedido: string,
  valor_total: string,
  itens_pedido: Array<{
    nome: string,
    valor: string
  }>
}