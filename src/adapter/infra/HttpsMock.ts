import { EStatus } from '../../modules/common/value-objects/EStatus'
import { HttpRequest, HttpResponse, IHttp } from '../../modules/pagamento'
import { PagamentoPedidoRepository } from '../persistence/PagamendoPedidoRepository'

export class HttpClientMock implements IHttp {
  async request<T>(_config: HttpRequest): Promise<HttpResponse<T>> {
    const pedidoRepository = new PagamentoPedidoRepository()
    await pedidoRepository.atualizarStatusPedidoPago(parseInt(_config.body.external_reference, 10), EStatus.Recebido)
    const result = { qr_data: 'valor para gerar QRCode' }
    return { statusCode: 200, body: result as T }
  }
}
