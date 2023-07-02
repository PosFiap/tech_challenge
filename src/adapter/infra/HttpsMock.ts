import { HttpRequest, HttpResponse, IHttp } from "../../modules/pagamento/ports/IHttp";

export class HttpClientMock implements IHttp {
  async request<T>(_config: HttpRequest): Promise<HttpResponse<T>> {
    return { statusCode: 200, body: { qr_data: 'valor para gerar QRCode' } as T }
  }
}
