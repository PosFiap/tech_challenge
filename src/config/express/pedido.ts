import { Router } from 'express'
import { PedidoAdapter } from '../../adapter/controller/PedidoAdapter'
import { CustomError } from '../../utils/customError'
import { AtualizaStatusPedidoDTO, PedidoDTO } from '../../modules/pedido'
import { customErrorToResponse } from './error-parser'

const router: Router = Router()

router.post('/', async (req, res) => {
  const { CPF, itemDePedido } = req.body
  const adapter = new PedidoAdapter()
  const data = new PedidoDTO(CPF, itemDePedido)
  try {
    const resultado = await adapter.registraPedido(data)
    res.status(201).json(JSON.stringify(resultado))
  } catch (err) {
    if (err instanceof CustomError) {
      customErrorToResponse(err, res)
      return
    }
    res.status(500).json({
      mensagem: 'Falha ao registrar o pedido'
    })
  }
})

router.patch('/:codigoPedido', async (req, res) => {
  const codigoPedido = parseInt(req.params.codigoPedido, 10)
  const codigoStatus = parseInt(req.body.codigoStatus as string, 10)
  const adapter = new PedidoAdapter()
  const data = new AtualizaStatusPedidoDTO(
    codigoPedido, codigoStatus
  )
  try {
    const resultado = await adapter.atualizaStatusPedido(data)
    res.status(200).json({
      status: resultado.status,
      codigoPedido: resultado.codigoPedido
    })
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

router.get('/', async (_req, res) => {
  const controller = new PedidoAdapter()
  try {
    const listaPedidos = await controller.listaPedidos()
    res.status(200).json(listaPedidos.map((pedido) => {
      return {
        CPF: pedido.CPF,
        codigo: pedido.codigo,
        status: pedido.status,
        valorTotal: pedido.valorTotal,
        quantidadeItens: pedido.quantidadeItensPedido,
        itens: pedido.itensPedido
      }
    }))
  } catch (err) {
    res.status(500).json({
      mensagem: 'Falha ao recuperar os pedidos'
    })
  }
})

export { router }
