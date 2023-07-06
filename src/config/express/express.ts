import { Router } from "express";
import { router as clienteRouter } from "./cliente";
import { router as pedidoRouter } from "./pedido";
import { router as produtoRouter } from "./produto";

const router: Router = Router();

router.use('/health', (req, res) => res.sendStatus(200));
router.use('/cliente', clienteRouter);
router.use('/pedido', pedidoRouter);
router.use('/produto', produtoRouter);

export { router };