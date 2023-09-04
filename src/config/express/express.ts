import { Router } from 'express'
import { PedidoHTTP } from '../../adapter/http/pedido'
import { PedidoController } from '../../adapter/controller/PedidoController'
import { ClienteController } from '../../adapter/controller/ClienteController'
import { ClienteHTTP } from '../../adapter/http/cliente'
import { ProdutoHTTP } from '../../adapter/http/produto'
import { ProdutoController } from '../../adapter/controller/ProdutoController'
import { PagamentoHttp } from '../../adapter/http/pagamento'
import { PagamentoQrCodeController } from '../../adapter/controller/PagamentoQrCodeController'
import { EventoPagamentoHttp } from '../../adapter/http/pagamento-webhook'
import { ProcessaEventoPagamentoController } from '../../adapter/controller/ProcessaEventoPagamentoController'
import { PedidoService } from '../../modules/pedido'
import { PrismaPedidoRepository } from '../../adapter/persistence/PedidoRepository'
import { MeioPagamentoUpdateStatus } from '../../adapter/gateways/MeioPagamentoUpdateStatus'
import { HttpClient } from '../../adapter/infra/Http'

const router: Router = Router()

const pedidoHTTP = new PedidoHTTP(
  PedidoController.create()
)

const clienteHTTP = new ClienteHTTP(
  ClienteController.create()
)

const produtoHTTP = new ProdutoHTTP(
  ProdutoController.create()
)

const pagamentoHttp = new PagamentoHttp(
  PagamentoQrCodeController.create()
)

const eventoPagamentoHttp = new EventoPagamentoHttp(
  ProcessaEventoPagamentoController.create(
    new MeioPagamentoUpdateStatus(
      new HttpClient(),
      process.env.ACCESS_TOKEN_MP
    ),
    new PedidoService(new PrismaPedidoRepository())
  )
)

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/cliente', clienteHTTP.getRouter())
router.use('/pedido', pedidoHTTP.getRouter())
router.use('/produto', produtoHTTP.getRouter())
router.use('/pagamento', pagamentoHttp.getRouter())
router.use('/pagamento/webhook', eventoPagamentoHttp.getRouter())

export { router }
