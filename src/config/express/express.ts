import { Router } from "express";
import { PedidoHTTP } from "../../adapter/http/pedido";
import { PedidoController } from "../../adapter/controller/PedidoController";
import { ClienteController } from "../../adapter/controller/ClienteController";
import { ClienteHTTP } from "../../adapter/http/cliente";
import { router as produtoRouter } from "./produto";

const router: Router = Router();

const pedidoHTTP = new PedidoHTTP(
    PedidoController.create()
);

const clienteHTTP = new ClienteHTTP(
    ClienteController.create()
)

router.use('/health', (req, res) => res.sendStatus(200));
router.use('/cliente', clienteHTTP.getRouter());
router.use('/pedido', pedidoHTTP.getRouter());
router.use('/produto', produtoRouter);

export { router };