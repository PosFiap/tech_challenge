import { Router } from "express";
import { ClienteAdapter } from "../controller/ClienteAdapter";

const router: Router = Router();

router.post('/', async (req, res) => {
    const adapter = new ClienteAdapter();
    const cliente = req.body;
    const resultado = await adapter.registraCliente(cliente);
    console.log(resultado)
    res.status(201).json(resultado);

});

export { router };