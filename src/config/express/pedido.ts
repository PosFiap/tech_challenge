import { Router } from "express";
import { PedidoAdapter } from "../../adapter/controller/PedidoAdapter";

const router: Router = Router();

router.post('/', (req, res) => { 
    const pedido = req.body;
    const adapter = new PedidoAdapter();
    const resultado = adapter.registraPedido(pedido);
    res.status(201).json(JSON.stringify(resultado));
});

export { router };