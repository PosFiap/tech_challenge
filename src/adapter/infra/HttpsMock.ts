import { HttpRequest, HttpResponse, IHttp } from "../../modules/pagamento/ports/IHttp";
import { PedidoAdapter } from "../controller/PedidoAdapter";
import { AtualizaStatusPedidoDTO } from "./../../modules/pedido"

export class HttpClientMock implements IHttp {
  async request<T>(_config: HttpRequest): Promise<HttpResponse<T>> {
    const pedidoAdapter = new PedidoAdapter()
    const pedidoStatusDTO = new AtualizaStatusPedidoDTO(
      _config.body.external_reference,
      1
    )
    await pedidoAdapter.atualizaStatusPedido(pedidoStatusDTO)
    return { statusCode: 200, body: { qr_data: 'valor para gerar QRCode' } as T }
  }
}
