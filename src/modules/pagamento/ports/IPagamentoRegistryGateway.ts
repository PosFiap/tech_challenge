import { EStatus } from '../../common/value-objects/EStatus'
import { EStatusPagamento } from '../../common/value-objects/EStatusPagamento';
import { PedidoPagamentoDTO } from '../dto'
import { Fatura } from '../model';

export interface IPagamentoRepositoryGateway {
  obterPedidoPeloCodigo(codigo: number): Promise<PedidoPagamentoDTO>;
  atualizarStatusPedidoPago(codigo: number, status: EStatus): Promise<boolean>;
  // obterPedidoPelaFatura (fatura_id: string): Promise<Fatura>;
  obtemFaturaPorCodigo(fatura_id: string): Promise<Fatura>;
  atualizarStatusFatura(fatura_id: string, statusPagamento: EStatusPagamento): Promise<Fatura>;
}
