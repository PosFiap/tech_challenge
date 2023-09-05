/*import { ICheckoutService } from '../../../modules/pagamento'
import { IPagamentoQrCodeController } from '../IPagamentoQrCodeController'
import { PagamentoQrCodeController } from '../PagamentoQrCodeController'

interface SutTypes {
  sut: IPagamentoQrCodeController
  checkoutService: ICheckoutService<string>
}

class CheckotServiceMock<S> implements ICheckoutService<S> {
  async atualizaStatusPedidoPago (_codigo: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async checkoutQrCode (_codigoPedido: number): Promise<S> {
    throw new Error('Method not implemented.')
  }
}

const makeSut = (): SutTypes => {
  const checkoutService = new CheckotServiceMock<string>()
  return {
    sut: PagamentoQrCodeController.create(checkoutService),
    checkoutService
  }
}

describe('PagamentoQeCodeAdapter', () => {
  beforeEach(() => {
    process.env.ID_USUARIO_MP = 'qualquer usuario'
    process.env.ID_EXTERNO_CAIXA = 'qualquer valor'
    process.env.ACCESS_TOKEN_MP = 'qualquer token'
  })

  describe('gerarPagamentoQrCode', () => {
    it('Espero receber string para gerar qrcode do pagamento', async () => {
      const { sut, checkoutService } = makeSut()
      const checkoutSpy = jest.spyOn(checkoutService, 'checkoutQrCode')
        .mockResolvedValueOnce('valor para gerar QrCode')
      const result = await sut.gerarPagamentoQrCode(0)
      console.log(result)
      expect(checkoutSpy).toBeCalledTimes(1)
      expect(checkoutSpy).toBeCalledWith(0)
      expect(result).toBe('valor para gerar QrCode')
    })
  })
}) */
