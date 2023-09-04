import { Router } from 'express'
import { IHttpRoute } from './IRoute'
import { CustomError } from '../../utils'
import { customErrorToResponse } from './error-parser'
import { IProcessaEventoPagamentoController } from '../controller/IProcessaEventoPagamentoController'

export class EventoPagamentoHttp implements IHttpRoute {
  private readonly router: Router

  constructor (
    private readonly eventoPagamentoController: IProcessaEventoPagamentoController
  ) {
    this.router = Router()
    this.setRoutes()
  }

  private setRoutes (): void {
    this.router.post('/', async (req, res): Promise<void> => {
      try {
        const { topic, id } = req.query

        await this.eventoPagamentoController.processaEvento(id as string, topic as string)

        res.status(200).send()
      } catch (err) {
        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }

        console.log(err)

        res.status(500).json({
          mensagem: 'Falha ao atualizar o pedido'
        })
      }
    })
  }

  getRouter (): Router {
    return this.router
  }
}
