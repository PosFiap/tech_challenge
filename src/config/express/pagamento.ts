import { Router } from 'express'
import { isErro } from '../../utils'
import { Pagamento } from '../../factories/pagamento'

const router: Router = Router()

router.post('/', async (req, res): Promise<void> => {
  const { pedidoId } = req.body

  if (!pedidoId) {
    res.status(400).json({ message: 'Bad request!' })
    return
  }

  const result = await Pagamento.gerarPagamentoQrCode(pedidoId)

  if (isErro(result)) {
    console.error(result.erro)
    res.status(500).json({ message: 'Internal server error' })
  }

  res.status(200).json({ qrcode: result.sucesso })
})

export { router }
