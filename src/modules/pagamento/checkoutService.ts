import { CustomError } from '../../utils/customError'
import { isErro, makeErro, makeSucesso } from '../../utils/either'
import { IMeioDePagamentoQR } from './ports/IMeioDePagamentoQR'

export class CheckoutService<T, S> {
  constructor(
    private readonly meioDePagamento: IMeioDePagamentoQR<T, S>
  ) {
    const valido = this.validaSeRecebeuOsParametros()
    if (isErro(valido)) {
      throw new Error(valido.erro)
    }
  }

  private validaSeRecebeuOsParametros() {
    if (!this.meioDePagamento) {
      return makeErro('meioDePagamento é requerido.')
    }

    return makeSucesso(true)
  }

  async checkoutQrCode(pedido: T): Promise<S> {
    try {
      return this.meioDePagamento.checkoutQrCode(pedido)
    } catch (error) {
      throw error
    }
  }
}
