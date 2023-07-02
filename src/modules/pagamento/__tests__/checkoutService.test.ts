import { CheckoutService } from "../checkoutService"
import { IMeioDePagamentoQR } from "../ports/IMeioDePagamentoQR"

interface SutTypes {
  sut: CheckoutService<any, any>
  meioDePagamento: IMeioDePagamentoQR<any, any>
}

class meioDePagamentoMock implements IMeioDePagamentoQR<any, any> {
  async checkoutQrCode(_pedido: any): Promise<any> {
    return true
  }
}

const makeSut = (): SutTypes => {
  const meioDePagamento = new meioDePagamentoMock()
  const sut = new CheckoutService(meioDePagamento)
  return {
    sut,
    meioDePagamento
  }
}

describe('CheckoutService', () => {
  describe('Contructor', () => {
    it('Espero receber erro na contrução do serviço por não enviar os argumentos necessarios', () => {
      // @ts-expect-error
      const caller1 = () => new CheckoutService()
      expect(caller1).toThrowError(new Error("meioDePagamento é requerido!"))
    })
  })

  describe('Checkout', () => {
    it('Espero concluir o checkou com sucesso', async () => {
      const { sut, meioDePagamento } = makeSut()
      const meioDePagamentoSpy = jest.spyOn(meioDePagamento, 'checkoutQrCode')
      const res = await sut.checkoutQrCode({ any: 'any value' })
      expect(res).toBe(true)
      expect(meioDePagamentoSpy).toBeCalledWith({ any: 'any value' })
      expect(meioDePagamentoSpy).toBeCalledTimes(1)
    })
  })
})
