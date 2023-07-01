import { Router } from "express";
import { ClienteAdapter } from "../../adapter/controller/ClienteAdapter";

const router: Router = Router();

// Create
router.post('/', async (req, res) => {
    const adapter = new ClienteAdapter();
    const cliente = req.body;
    const resultado = await adapter.registraCliente(cliente);
    res.status(201).json(resultado);
});

// Read
router.get('/', async (_req, res) => {
  const adapter = new ClienteAdapter();
  const resultado = await adapter.listaCliente();
  res.status(200).json(resultado);
});

// Read Only CPF
router.get('/:cpf', async (req, res) => {
  const adapter = new ClienteAdapter();
  const {cpf} = req.params;
  const resultado = await adapter.listaClienteCPF(cpf);
  if (!resultado) {
    res.status(404).send('Cliente não encontrado');
    return
  }
  res.status(200).json(resultado);
});

// Update
router.put('/', async (req, res) => {
    const adapter = new ClienteAdapter();
    const cliente = req.body;
    const resultado = await adapter.atualizaCliente(cliente);
  
    res.status(201).json(resultado);
});

// Delete
router.delete('/', async (req, res) => {
  const adapter = new ClienteAdapter();
  const {codigo} = req.body;
  const resultado = await adapter.deletaCliente(codigo);
  res.status(201).json(resultado);
});


export { router };