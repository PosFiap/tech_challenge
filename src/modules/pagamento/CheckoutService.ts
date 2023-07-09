import { CustomError, CustomErrorType, Either, isErro, makeErro, makeSucesso } from '../../utils'
import { EStatus } from '../common/value-objects/EStatus'
import { PedidoPagamentoDTO } from './dto'
import { IMeioDePagamentoQR, IPagamentoPedidoRegistry } from './ports'
import { ICheckoutService } from './ports/ICheckoutService'

export class CheckoutService<S> implements ICheckoutService<S> {
  constructor (
    private readonly meioDePagamento: IMeioDePagamentoQR<PedidoPagamentoDTO, S>,
    private readonly pedidoPagamentoRepository: IPagamentoPedidoRegistry
  ) {
    const valido = this.validaSeRecebeuOsParametros()
    if (isErro(valido)) {
      throw new CustomError(CustomErrorType.InstantiatingError, valido.erro)
    }
  }

  private validaSeRecebeuOsParametros (): Either<string, boolean> {
    if (!this.meioDePagamento) {
      return makeErro('meioDePagamento é requerido.')
    }

    if (!this.pedidoPagamentoRepository) {
      return makeErro('pedidoPagamentoRepository é requerido.')
    }

    return makeSucesso(true)
  }

  async atualizaStatusPedidoPago (codigo: number): Promise<Either<string, boolean>> {
    try {
      await this.pedidoPagamentoRepository.atualizarStatusPedidoPago(codigo, EStatus.Recebido)
      return makeSucesso(true)
    } catch (error) {
      return makeErro('Erro ao atulizar status do pedido como pago')
    }
  }

  async checkoutQrCode (codigoPedido: number): Promise<Either<string, S>> {
    try {
      const pedido = await this.pedidoPagamentoRepository.obterPedidoPeloCodigo(codigoPedido)
      const checkoutResult = await this.meioDePagamento.checkoutQrCode(pedido)
      return makeSucesso(checkoutResult as S)
    } catch (error) {
      console.error(error)
      return makeErro('Erro ao efetuar checkout')
    }
  }
}
