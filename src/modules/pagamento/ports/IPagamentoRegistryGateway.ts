import { EStatus } from '../../common/value-objects/EStatus'
import { EStatusPagamento } from '../../common/value-objects/EStatusPagamento';
import { PedidoPagamentoDTO } from '../dto'
import { Fatura } from '../model';

export interface IPagamentoRepositoryGateway {
  obterPedidoPeloCodigo(codigo: number): Promise<PedidoPagamentoDTO>;
  atualizarStatusPedidoPago(codigo: number, status: EStatus): Promise<boolean>;
  obtemFaturaPorCodigo(fatura_id: string): Promise<Fatura>;
  atualizarStatusFatura(fatura_id: string, statusPagamento: EStatusPagamento): Promise<Fatura>;
  criaFatura(codigo_fatura: string, codigo_pedido: number): Promise<Fatura>;
}
