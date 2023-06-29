import { CheckoutService } from "../../../../core/applications/services/checkoutService"
import { IFaturaRepository } from "../../../../core/ports/IFaturaRepository"
import { IMeioDePagamento } from "../../../../core/ports/IMeioDePagamento"

interface SutTypes {
  sut: CheckoutService
  meioDePagamento: IMeioDePagamento
  faturaRepository: IFaturaRepository
}

const makeSut = (): SutTypes => {
  return {} as SutTypes
}

describe('CheckoutService', () => {
  describe('Contructor', () => {
    it('Espero receber erro na contrução do serviço por não enviar os argumentos necessarios', () => {
      // @ts-expect-error
      const caller1 = () => new CheckoutService()
      expect(caller1).toThrowError(new Error("meioDePagamento e faturaRepository são requeridos!"))

      // @ts-expect-error
      const caller2 = () => new CheckoutService({})
      expect(caller2).toThrowError(new Error("meioDePagamento e faturaRepository são requeridos!"))
    })
  })

  describe('Checkout', () => {
    it('Espero concluir o checkou com sucesso', async () => {
      const { sut, meioDePagamento, faturaRepository } = makeSut()
      // TODO: implementar testes de checkout
    })
  })
})
