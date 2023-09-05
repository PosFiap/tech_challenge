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
        const { codigo_fatura } = req.body

        if (!codigo_fatura) {
          res.status(400).json({ message: 'o código da fatura é necessário' });
          return;
        }

        const pedidoRepositoryGateway = new PrismaPedidoRepositoryGateway();
        const pedidoUseCases = new PedidoUseCases();

        const fatura = await this.pagamentoController.confirmaPagamentoEEnviaPedido(
          codigo_fatura,
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
        const { codigo_fatura } = req.body

        if (!codigo_fatura) {
          res.status(400).json({ message: 'o código da fatura é necessário' });
          return;
        }

        const fatura = await this.pagamentoController.rejeitaPagamento(
          codigo_fatura,
          this.defaultPagamentoRepositoryGateway
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

    this.router.get('/situacao', async (req, res): Promise<void> => {
      try {
        const { codigo_fatura } = req.query as { codigo_fatura: string};

        if (!codigo_fatura) {
          res.status(400).json({ message: 'o código da fatura é necessário' });
          return;
        }

        const situacaoPagamento = await this.pagamentoController.verificaSituacaoPagamento(
          codigo_fatura,
          this.defaultPagamentoRepositoryGateway
        );

        const retornoPagamento = PagamentoDetalhadoPresenterFactory.create(
          situacaoPagamento.pedido_codigo,
          situacaoPagamento.fatura_id,
          situacaoPagamento.situacao,
          situacaoPagamento.data_criacao,
          situacaoPagamento.data_atualizacao,
          situacaoPagamento.pedido_cpf
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
