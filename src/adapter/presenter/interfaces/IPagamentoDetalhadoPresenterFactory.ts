import { EStatusPagamento } from '../../../modules/common/value-objects/EStatusPagamento';
import { IPagamentoDetalhadoPresenter } from './IPagamentoDetalhadoPresenter';

export interface IPagamentoDetalhadoPresenterFactory {
  create(
    codigoPagamento: number,
    codigoPedido: number,
    codigoFatura: string,
    situacao: EStatusPagamento,
    dataCriacao: Date,
    dataAtualizacao: Date,
    CPFCliente?: string
  ): IPagamentoDetalhadoPresenter
}