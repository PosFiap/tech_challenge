import { Router } from "express";
import { ClienteAdapter } from "../../adapter/controller/ClienteAdapter";

const router: Router = Router();

router.post('/', (req, res) => { 

    const adapter = new ClienteAdapter();
    const cliente = req.body;
    const resultado = adapter.registraCliente(cliente);
    res.status(201).json(JSON.stringify(resultado));

});

export { router };