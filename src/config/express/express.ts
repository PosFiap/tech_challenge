import { Router } from 'express'
import { PedidoHTTP } from '../../adapter/http/pedido'
import { PedidoController } from '../../adapter/controller/PedidoController'
import { ClienteController } from '../../adapter/controller/ClienteController'
import { ClienteHTTP } from '../../adapter/http/cliente'
import { ProdutoHTTP } from '../../adapter/http/produto'
import { ProdutoController } from '../../adapter/controller/ProdutoController'
import { PagamentoHttp } from '../../adapter/http/PagamentoHTTP'
import { PagamentoQrCodeController } from '../../adapter/controller/PagamentoQrCodeController'
import { PrismaPedidoRepositoryGateway } from '../../adapter/persistence/PedidoRepository'
import { PrismaPagamentoRepositoryGateway } from '../../adapter/gateways/repository/PrismaPagamentoRepositoryGateway'

const router: Router = Router()

const pedidoHTTP = new PedidoHTTP(
  PedidoController.create(),
  new PrismaPedidoRepositoryGateway()
)

const clienteHTTP = new ClienteHTTP(
  ClienteController.create()
)

const produtoHTTP = new ProdutoHTTP(
  ProdutoController.create()
)

const pagamentoHttp = new PagamentoHttp(
  PagamentoQrCodeController.create(),
  new PrismaPagamentoRepositoryGateway()
)

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/cliente', clienteHTTP.getRouter())
router.use('/pedido', pedidoHTTP.getRouter())
router.use('/produto', produtoHTTP.getRouter())
router.use('/pagamento', pagamentoHttp.getRouter())

export { router }
