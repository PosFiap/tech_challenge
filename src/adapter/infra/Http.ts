import https from 'node:https'
import { HttpRequest, HttpResponse, HttpStatusCode, IHttp } from '../../modules/pagamento'

export class HttpClient implements IHttp {
  async request<T>(config: HttpRequest): Promise<HttpResponse<T>> {
    const options = {
      host: config.host,
      path: config.path,
      headers: config.headers,
      method: config.method
    }

    return new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        response.on('data', (d) => {
          resolve({
            statusCode: response.statusCode as HttpStatusCode,
            body: d
          })
        })
      })

      if (config.body) {
        req.write(JSON.stringify(config.body))
      }

      req.on('error', (error) => {
        console.error(error)
        reject(new Error('Erro ao tentar efetuar a request!'))
      })

      req.end()
    })
  }
}
