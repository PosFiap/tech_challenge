import { CustomError } from "../../../../utils/customError"
import { IFaturaRepository } from "../../ports/IFaturaRepository"
import { IMeioDePagamento } from "../../ports/IMeioDePagamento"

export class CheckoutService {
  _meioDePagamento: IMeioDePagamento
  _faturaRepository: IFaturaRepository

  constructor(meioDePagamento: IMeioDePagamento, faturaRepository: IFaturaRepository) {
    this._meioDePagamento = meioDePagamento
    this._faturaRepository = faturaRepository

    this.validaSeRecebeuOsParametros()
  }

  private validaSeRecebeuOsParametros() {
    if (!this._meioDePagamento || !this._faturaRepository) {
      throw new CustomError(
        'Erro ao criar CheckoutService',
        'meioDePagamento e faturaRepository são requeridos!'
      )
    }
  }

  // TODO: implementar checkout
  async checkout(faturaId: number): Promise<any> {
    try {
      const fatuara = await this._faturaRepository.obterFaturaPeloId(faturaId)
      await this._meioDePagamento.checkoutQrCode(fatuara)
    } catch (error) {
      throw error
    }
  }
}
