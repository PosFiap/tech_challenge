import { EStatus } from '../../modules/common/value-objects/EStatus'
import { HttpRequest, HttpResponse, IHttp } from '../../modules/pagamento'
import { PrismaPagamentoRepositoryGateway } from '../gateways/repository/PrismaPagamentoRepositoryGateway'

export class HttpClientMock implements IHttp {
  async request<T>(_config: HttpRequest): Promise<HttpResponse<T>> {
    const pedidoRepository = new PrismaPagamentoRepositoryGateway()
    await pedidoRepository.atualizarStatusPedidoPago(parseInt(_config.body.external_reference, 10), EStatus.Recebido)
    const result = { qr_data: 'valor para gerar QRCode' }
    return { statusCode: 200, body: result as T }
  }
}
