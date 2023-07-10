import { Router } from 'express'
import { PedidoHTTP } from '../../adapter/http/pedido'
import { PedidoController } from '../../adapter/controller/PedidoController'
import { ClienteController } from '../../adapter/controller/ClienteController'
import { ClienteHTTP } from '../../adapter/http/cliente'
import { ProdutoHTTP } from '../../adapter/http/produto'
import { ProdutoController } from '../../adapter/controller/ProdutoController'

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

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/cliente', clienteHTTP.getRouter())
router.use('/pedido', pedidoHTTP.getRouter())
router.use('/produto', produtoHTTP.getRouter())

export { router }
