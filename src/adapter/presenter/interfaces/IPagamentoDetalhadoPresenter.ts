import { EStatusPagamento } from '../../../modules/common/value-objects/EStatusPagamento';

export interface IPagamentoDetalhadoPresenter {
  codigoPagamento: number,
  codigoPedido: number,
  codigoFatura: string,
  statusPagamento: EStatusPagamento,
  dataCriacao: Date,
  dataAtualizacao: Date,
  CPFCliente?: string,
  format(): Object
}

export interface IPagamentoDetalhadoPresenterJSON extends IPagamentoDetalhadoPresenter {}

export interface IPagamentoDetalhadoPresenterJSONFormat {
  status: string,
  numero_pedido: string,
  codigo_fatura: string,
  CPF_cliente?: string,
  data_fatura: string,
  data_atualizacao: string
}