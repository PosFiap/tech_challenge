import { Router } from "express";
import { router as clienteRouter } from "../../adapter/http/cliente";
import { PedidoHTTP } from "../../adapter/http/pedido";
import { PedidoController } from "../../adapter/controller/PedidoController";
import { router as produtoRouter } from "./produto";

const router: Router = Router();

const pedidoHTTP = new PedidoHTTP(
    PedidoController.create()
);

router.use('/health', (req, res) => res.sendStatus(200));
router.use('/cliente', clienteRouter);
router.use('/pedido', pedidoHTTP.getRouter());
router.use('/produto', produtoRouter);

export { router };