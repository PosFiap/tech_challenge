import { Router } from 'express'
import { IHttpRoute } from './IRoute'
import { IPagamentoQrCodeController } from '../controller/IPagamentoQrCodeController'
import { isErro } from '../../utils'

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
      const { pedidoId } = req.body

      if (!pedidoId) {
        res.status(400).json({ message: 'Bad request!' })
        return
      }

      const result = await this.pagamentoController.gerarPagamentoQrCode(pedidoId)

      if (isErro(result)) {
        console.error(result.erro)
        res.status(500).json({ message: 'Internal server error' })
      }

      res.status(200).json({ qrcode: result.sucesso })
    })
  }

  getRouter (): Router {
    throw new Error('Method not implemented.')
  }
}
