import { PagamentoQrCodeAdapter } from '../adapter/controller/PagamentoQrCodeAdapter'
import { MeioPagamentoMercadoPago } from '../adapter/gateways/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../adapter/infra/HttpsMock'
import { PagamentoPedidoRepository } from '../adapter/persistence/PagamendoPedidoRepository'
import { CheckoutService } from '../modules/pagamento'

const makeRecursoPagamento = (): PagamentoQrCodeAdapter => {
  const qrCode = new MeioPagamentoMercadoPago(new HttpClientMock())
  const checkoutService = new CheckoutService(qrCode, new PagamentoPedidoRepository())
  return new PagamentoQrCodeAdapter(checkoutService)
}

export const Pagamento = makeRecursoPagamento()
