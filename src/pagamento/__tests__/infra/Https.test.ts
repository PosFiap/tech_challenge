import httpsMock from "node:https"
import Stream from 'stream'

import { HttpClient } from "../../adapters/infra/Http"
import { IHttp } from "../../core/ports/IHttp"

jest.mock('https', () => ({
  request: {}
}))

interface SutTypes {
  sut: IHttp
}

const makeSut = (): SutTypes => ({
  sut: new HttpClient()
})

describe('HttpClient', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('request', () => {
    it('Espero receber um status 200 ao efetuar uma request com metodo GET valida', async () => {
      const { sut } = makeSut()
      const res = await sut.request({ host: 'www.google.com', method: 'GET' })
      expect(res.statusCode).toBe(200)
    })

    it('Espero receber um erro ao fazer uma chamada invalida', async () => {
      const { sut } = makeSut()
      const res = await sut.request({ host: 'www.google.com', path: 'asdas', method: 'GET' })
      expect(res.statusCode).toBe(404)
    })

    it('Espero receber um erro de request', async () => {
      const { sut } = makeSut()
      const res = sut.request({ host: '0.0.0.0', method: 'GET' })
      await expect(res).rejects.toThrowError(new Error('Erro ao tentar efetuar a request!'))
    })

    it('Espero enviar uma request com payload com sucesso', async () => {
      const { sut } = makeSut()

      const stream = new Stream()
      httpsMock.request = jest.fn().mockImplementationOnce((configRequest, cb) => {
        expect(configRequest.method).toBe('POST')
        expect(configRequest.host).toBe('any.server.com')

        // @ts-expect-error
        stream.statusCode = 201
        cb(stream)
        stream.emit('data', { message: 'Criado com sucesso!' })
        stream.emit('end')
      })

      const res = await sut.request({ host: 'any.server.com', method: 'POST', body: { message: 'Olá!' } })
      expect(res.statusCode).toBe(201)
      expect(res.body).toMatchObject({ message: 'Criado com sucesso!' })
    })
  })
})
