import { Router } from 'express'
import { IHttpRoute } from './IRoute'
import { IPagamentoQrCodeController } from '../controller/IPagamentoQrCodeController'
import { CustomError, isErro } from '../../utils'
import { customErrorToResponse } from './error-parser'

export class PagamentoHttp implements IHttpRoute {
  private readonly router: Router

  constructor (
    private readonly pagamentoController: IPagamentoQrCodeController
  ) {
    this.router = Router()
    this.setRoutes()
  }

  private setRoutes (): void {
    this.router.post('/', async (req, res): Promise<void> => {
      try {
        const { pedidoId } = req.body

        if (!pedidoId) {
          res.status(400).json({ message: 'pedidoId é requerido' })
          return
        }

        const result = await this.pagamentoController.gerarPagamentoQrCode(pedidoId)

        res.status(200).json({ qrcode: result })
      } catch (err) {
        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }

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
