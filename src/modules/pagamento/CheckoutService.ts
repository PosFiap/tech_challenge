import { CustomError, CustomErrorType } from '../../utils'
import { EStatus } from '../common/value-objects/EStatus'
import { PedidoPagamentoDTO } from './dto'
import { IMeioDePagamentoQR, IPagamentoPedidoRepository } from './ports'
import { ICheckoutService } from './ports/ICheckoutService'

export class CheckoutService<S> implements ICheckoutService<S> {
  constructor (
    private readonly meioDePagamento: IMeioDePagamentoQR<PedidoPagamentoDTO, S>,
    private readonly pedidoPagamentoRepository: IPagamentoPedidoRepository
  ) {
    this.validaSeRecebeuOsParametros()
  }

  private validaSeRecebeuOsParametros (): void {
    if (!this.meioDePagamento) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'meioDePagamento é requerido.')
    }

    if (!this.pedidoPagamentoRepository) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'pedidoPagamentoRepository é requerido.')
    }
  }

  async atualizaStatusPedidoPago (codigo: number): Promise<boolean> {
    try {
      await this.pedidoPagamentoRepository.atualizarStatusPedidoPago(codigo, EStatus.Recebido)
      return true
    } catch (error) {
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (error as Error).message)
    }
  }

  async checkoutQrCode (codigoPedido: number): Promise<S> {
    const pedido = await this.pedidoPagamentoRepository.obterPedidoPeloCodigo(codigoPedido)

    if (pedido.status >= EStatus.Recebido) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'O pedido já passou da etapa de pagamento!')
    }

    const result = await this.meioDePagamento.checkoutQrCode(pedido)
    return result
  }
}
