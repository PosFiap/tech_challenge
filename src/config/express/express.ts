import { Router } from 'express'
import { router as clienteRouter } from './cliente'
import { router as pedidoRouter } from './pedido'

const router: Router = Router()

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/cliente', clienteRouter)
router.use('/pedido', pedidoRouter)

export { router }
