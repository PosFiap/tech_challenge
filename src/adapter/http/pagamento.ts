import { Router } from 'express'
import { IHttpRoute } from './IRoute'
import { IPagamentoQrCodeController } from '../controller/IPagamentoQrCodeController'
import { CustomError } from '../../utils'
import { customErrorToResponse } from './error-parser'
import { IPagamentoRepositoryGateway } from '../../modules/pagamento'
import { PagamentoDetalhadoPresenterFactory } from '../presenter/implementations/PagamentoDetalhadoPresenterFactory'
import { PrismaPedidoRepositoryGateway } from '../persistence/PedidoRepository'
import { PedidoController } from '../controller/PedidoController'
import { PedidoUseCases } from '../../modules/pedido'

export class PagamentoHttp implements IHttpRoute {
  private readonly router: Router

  constructor (
    private readonly pagamentoController: IPagamentoQrCodeController,
    private readonly defaultPagamentoRepositoryGateway: IPagamentoRepositoryGateway
  ) {
    this.router = Router()
    this.setRoutes()
  }

  private setRoutes (): void {

    this.router.post('/webhook/MP/confirmar', async (req, res): Promise<void> => {
      try {
        const { id_fatura } = req.body

        if (!id_fatura) {
          res.status(400).json({ message: 'o id da fatura é requerido' });
          return;
        }

        const pedidoRepositoryGateway = new PrismaPedidoRepositoryGateway();
        const pedidoUseCases = new PedidoUseCases();

        const fatura = await this.pagamentoController.confirmaPagamentoEEnviaPedido(
          id_fatura,
          this.defaultPagamentoRepositoryGateway,
          pedidoRepositoryGateway,
          pedidoUseCases,
        );

        const retornoPagamento = PagamentoDetalhadoPresenterFactory.create(
          fatura.pedido_codigo,
          fatura.fatura_id,
          fatura.situacao,
          fatura.data_criacao,
          fatura.data_atualizacao,
          fatura.pedido_cpf
        ).format();

        res.status(200).json(retornoPagamento)

      } catch (err) {
        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }

        res.status(500).json({
          mensagem: 'Falha ao atualizar o pagamento do pedido'
        })
      }
    });

    this.router.post('/webhook/MP/rejeitar', async (req, res): Promise<void> => {
      try {
        const { id_fatura } = req.body

        if (!id_fatura) {
          res.status(400).json({ message: 'o id da fatura é requerido' });
          return;
        }

        const retornoPagamento = await this.pagamentoController.rejeitaPagamento(
          id_fatura,
          this.defaultPagamentoRepositoryGateway
        );

        res.status(200).json(retornoPagamento)

      } catch (err) {
        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }

        res.status(500).json({
          mensagem: 'Falha ao atualizar o pagamento do pedido'
        })
      }
    });

    this.router.post('/', async (req, res): Promise<void> => {
      try {
        const { pedidoId } = req.body

        if (!pedidoId) {
          res.status(400).json({ message: 'pedidoId é requerido' })
          return
        }

        const result = await this.pagamentoController.gerarPagamentoQrCode(pedidoId, this.defaultPagamentoRepositoryGateway)

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
