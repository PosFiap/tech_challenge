import { CheckoutService } from '../checkoutService'
import { PedidoPagamentoDTO, EStatus } from '../dto'
import { IMeioDePagamentoQR, IPagamentoPedidoRegistry } from '../ports'

interface SutTypes {
  sut: CheckoutService<any>
  meioDePagamento: IMeioDePagamentoQR<any, any>
  pagamentoPedidoRepository: IPagamentoPedidoRegistry
}

class MeioDePagamentoMock implements IMeioDePagamentoQR<any, any> {
  async checkoutQrCode (_pedido: any): Promise<any> {
    return true
  }
}

class PedidoPagamentoRepository implements IPagamentoPedidoRegistry {
  async obterPedidoPeloCodigo (codigo: number): Promise<PedidoPagamentoDTO> {
    throw new Error('Method not implemented.')
  }

  async atualizarStatusPedidoPago (codigo: number, status: EStatus): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

const makeSut = (): SutTypes => {
  const meioDePagamento = new MeioDePagamentoMock()
  const pagamentoPedidoRepository = new PedidoPagamentoRepository()
  const sut = new CheckoutService(meioDePagamento, pagamentoPedidoRepository)
  return {
    sut,
    meioDePagamento,
    pagamentoPedidoRepository
  }
}

describe('CheckoutService', () => {
  describe('Contructor', () => {
    it('Espero receber erro na contrução do serviço por não enviar os argumentos necessarios', () => {
      // @ts-expect-error test error in constructor
      const caller1 = (): CheckoutService => new CheckoutService()
      expect(caller1).toThrowError(new Error('meioDePagamento é requerido.'))
    })
  })

  describe('Checkout', () => {
    it('Espero concluir o checkou com sucesso', async () => {
      const { sut, meioDePagamento, pagamentoPedidoRepository } = makeSut()
      const meioDePagamentoSpy = jest.spyOn(meioDePagamento, 'checkoutQrCode')
      const pedidoSpy = jest.spyOn(pagamentoPedidoRepository, 'obterPedidoPeloCodigo')
        .mockResolvedValueOnce({ codigo: 0, status: 0, itensDePedido: [] })
      const res = await sut.checkoutQrCode(1)
      expect(res.sucesso).toBe(true)
      expect(pedidoSpy).toBeCalledTimes(1)
      expect(pedidoSpy).toBeCalledWith(1)
      expect(meioDePagamentoSpy).toBeCalledWith({ codigo: 0, status: 0, itensDePedido: [] })
      expect(meioDePagamentoSpy).toBeCalledTimes(1)
    })
  })
})
