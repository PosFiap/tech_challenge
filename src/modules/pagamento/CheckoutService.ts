import { CustomError, CustomErrorType } from '../../utils'
import { EStatus } from '../common/value-objects/EStatus'
import { EStatusPagamento } from '../common/value-objects/EStatusPagamento'
import { PedidoPagamentoDTO } from './dto'
import { IMeioDePagamentoQR, IPagamentoRepositoryGateway } from './ports'
import { ICheckoutService } from './ports/ICheckoutService'
import { IFaturaPedido } from './ports/IFaturaPedido'

export class CheckoutService<S> implements ICheckoutService<S> {
  constructor (
    private readonly meioDePagamento: IMeioDePagamentoQR<PedidoPagamentoDTO, S>,
  ) {
    this.validaSeRecebeuOsParametros()
  }

  async confirmaPagamentoFatura(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<IFaturaPedido> {
    await pagamentoRepositoryGateway.atualizarStatusFatura(id_fatura, EStatusPagamento.Pago);
    const fatura = await pagamentoRepositoryGateway.obterPedidoPelaFatura(id_fatura);
    return fatura;
  }

  rejeitaPagamentoFatura(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<IFaturaPedido> {
    throw new Error('Method not implemented.')
  }

  private validaSeRecebeuOsParametros (): void {
    if (!this.meioDePagamento) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'meioDePagamento é requerido.')
    }

    /*if (!this.pedidoPagamentoRepository) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'pedidoPagamentoRepository é requerido.')
    }*/
  }

  async atualizaStatusPedidoPago (codigo: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<boolean> {
    try {
      await pagamentoPedidoRepositoryGateway.atualizarStatusPedidoPago(codigo, EStatus.Recebido)
      return true
    } catch (error) {
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (error as Error).message)
    }
  }

  async checkoutQrCode (codigoPedido: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<S> {
    const pedido = await pagamentoPedidoRepositoryGateway.obterPedidoPeloCodigo(codigoPedido)

    if (pedido.status >= EStatus.Recebido) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'O pedido já passou da etapa de pagamento!')
    }

    const result = await this.meioDePagamento.checkoutQrCode(pedido)
    return result
  }
}
