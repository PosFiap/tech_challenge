import { CustomError } from '../../utils/customError'
import { IMeioDePagamentoQR } from './ports/IMeioDePagamentoQR'

export class CheckoutService<T, S> {
  constructor(
    private readonly meioDePagamento: IMeioDePagamentoQR<T, S>
  ) {
    this.validaSeRecebeuOsParametros()
  }

  private validaSeRecebeuOsParametros() {
    if (!this.meioDePagamento) {
      throw new CustomError(
        'Erro ao criar CheckoutService',
        'meioDePagamento é requerido!'
      )
    }
  }

  async checkoutQrCode(pedido: T): Promise<S> {
    try {
      return this.meioDePagamento.checkoutQrCode(pedido)
    } catch (error) {
      throw error
    }
  }
}
