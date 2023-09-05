import { CustomError, CustomErrorType } from '../../utils';
import { EStatus } from '../common/value-objects/EStatus';
import { PagamentoUseCases } from './PagamentoUseCases';
import { PedidoPagamentoDTO } from './dto';
import { IMeioDePagamentoQR, IPagamentoRepositoryGateway } from './ports';
import { ICheckoutService } from './ports/ICheckoutService';

export class CheckoutService<S> extends PagamentoUseCases implements ICheckoutService<S> {
  constructor (
    private readonly meioDePagamento: IMeioDePagamentoQR<PedidoPagamentoDTO, S>,
  ) {
    super();
    this.validaSeRecebeuOsParametros()
  }

  private validaSeRecebeuOsParametros (): void {
    if (!this.meioDePagamento) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'meioDePagamento é requerido.')
    }
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
