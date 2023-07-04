import { Router } from "express";
import { PedidoAdapter } from "../../adapter/controller/PedidoAdapter";

const router: Router = Router();

router.post('/', (req, res) => { 
    const pedido = req.body;
    const adapter = new PedidoAdapter();
    const resultado = adapter.registraPedido(pedido);
    res.status(201).json(JSON.stringify(resultado));
});

router.get('/', async (req, res) => {
    const controller = new PedidoAdapter();
    try{
        const listaPedidos = await controller.listaPedidos();
        res.status(200).json(listaPedidos.map((pedido) => {
            return {
                CPF: pedido.CPF,
                codigo: pedido.codigo,
                status: pedido.status,
                valorTotal: pedido.valorTotal,
                quantidadeItens: pedido.quantidadeItensPedido,
                itens: pedido.itensPedido
            }
        }));
    } catch (err) {
        res.sendStatus(500).json({
            mensagem: 'Falha ao recuperar os pedidos'
        });
    }
});

export { router };