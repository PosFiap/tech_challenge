import { Fatura } from "../../gateways/MeioPagamentoMercadoPago"
import { PagamentoQrCodeAdapter } from "../PagamentoQrCodeAdapter"

interface SutTypes {
  sut: PagamentoQrCodeAdapter
}

const makeSut = (): SutTypes => ({
  sut: new PagamentoQrCodeAdapter()
})

describe('PagamentoQeCodeAdapter', () => {
  beforeEach(() => {
    process.env.ID_USUARIO_MP = 'qualquer usuario'
    process.env.ID_EXTERNO_CAIXA = 'qualquer valor'
    process.env.ACCESS_TOKEN_MP = 'qualquer token'
  })

  describe('gerarPagamentoQrCode', () => {
    it('Espero receber string para gerar qrcode do pagamento', async () => {
      const { sut } = makeSut()
      const result = await sut.gerarPagamentoQrCode({} as Fatura)
      expect(result).toBe('valor para gerar QRCode')
    })
  })
})
