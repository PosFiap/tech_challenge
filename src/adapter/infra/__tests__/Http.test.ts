import httpsMock from 'node:https'
import Stream from 'stream'

import { HttpClient } from '../Http'
import { IHttp } from '../../../modules/pagamento/ports/IHttp'

jest.mock('https', () => ({
  request: {}
}))

interface SutTypes {
  sut: IHttp
}

const makeSut = (url?: string, method?: string, statusCode?: number, data?: any, error?: boolean): SutTypes => {
  const stream = new Stream()
  class Request extends Function {
    events: Record<string, any> = {}

    apply (...args: any): Request {
      if (!error) {
        expect(args[1][0].method).toBe(method)
        expect(args[1][0].host).toBe(url)

        // @ts-expect-error adicionado campo não sendo parte do tipo inicial
        stream.statusCode = statusCode
        args[1][1](stream)
        stream.emit('data', data)
        stream.emit('end')
      }

      return this
    }

    end (): void {
      if (error) {
        this.emit('error')
      }
    }

    on (event: string, listener: Function): void {
      this.events[event] = listener
    }

    emit (event: string): void {
      this.events[event](new Error('Ferrou!'))
    }
  }

  const request = new Request()

  // @ts-expect-error criando apenas o mock
  httpsMock.request = jest.fn().mockImplementation(request)

  return {
    sut: new HttpClient()
  }
}

describe('HttpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('request', () => {
    it('Espero receber um status 200 ao efetuar uma request com metodo GET valida', async () => {
      const { sut } = makeSut('any.server.com', 'GET', 200)
      const res = await sut.request({ host: 'any.server.com', method: 'GET' })
      expect(res.statusCode).toBe(200)
    })

    it('Espero receber um erro ao fazer uma chamada invalida', async () => {
      const { sut } = makeSut('any.server.com', 'GET', 404)
      const res = await sut.request({ host: 'any.server.com', path: 'asdas', method: 'GET' })
      expect(res.statusCode).toBe(404)
    })

    it('Espero receber um erro de request', async () => {
      const { sut } = makeSut('any.server.com', 'GET', undefined, undefined, true)
      const res = sut.request({ host: 'any.server.com', method: 'GET' })
      await expect(res).rejects.toThrowError(new Error('Erro ao tentar efetuar a request!'))
    })

    it('Espero enviar uma request com payload com sucesso', async () => {
      const { sut } = makeSut(
        'any.server.com',
        'POST',
        201,
        { message: 'Criado com sucesso!' }
      )

      const res = await sut.request({
        host: 'any.server.com',
        method: 'POST',
        body: { message: 'Olá!' }
      })
      expect(res.statusCode).toBe(201)
      expect(res.body).toMatchObject({ message: 'Criado com sucesso!' })
    })
  })
})
