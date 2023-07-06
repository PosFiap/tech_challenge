import { Router } from 'express'
import { PagamentoQrCodeAdapter } from '../../adapter/controller/PagamentoQrCodeAdapter'
import { isErro } from '../../utils'

const router: Router = Router()

router.post('/', async (req, res): Promise<void> => {
  const { pedidoId } = req.body

  if (!pedidoId) {
    res.status(400).json({ message: 'Bad request!' })
    return
  }

  const pagamentoQrCode = new PagamentoQrCodeAdapter()
  const result = await pagamentoQrCode.gerarPagamentoQrCode(pedidoId)

  if (isErro(result)) {
    console.error(result.erro)
    res.status(500).json({ message: 'Internal server error' })
  }

  res.status(200).json({ qrcode: result.sucesso })
})

export { router }
