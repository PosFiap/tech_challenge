import { EStatus } from '../../common/value-objects/EStatus'
import { EStatusPagamento } from '../../common/value-objects/EStatusPagamento';
import { PedidoPagamentoDTO } from '../dto'
import { IFaturaPedido } from './IFaturaPedido';

export interface IPagamentoRepositoryGateway {
  obterPedidoPeloCodigo(codigo: number): Promise<PedidoPagamentoDTO>;
  atualizarStatusPedidoPago(codigo: number, status: EStatus): Promise<boolean>;
  obterPedidoPelaFatura (fatura_id: string): Promise<IFaturaPedido>;
  atualizarStatusFatura(fatura_id: string, statusPagamento: EStatusPagamento): Promise<IFaturaPedido>;
}
