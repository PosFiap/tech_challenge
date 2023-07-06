import { Router } from "express";
import { ClienteAdapter } from "../../adapter/controller/ClienteAdapter";
import { CustomError } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";

const router: Router = Router();

// Create
router.post('/', async (req, res) => {
  const adapter = new ClienteAdapter();
  const cliente = req.body;
  try {
    const resultado = await adapter.registraCliente(cliente);
    res.status(201).json(resultado);
    
  } catch (err) {
    if( err instanceof CustomError) {
        customErrorToResponse(err, res);
        return;
    }
    res.status(500).json({
        mensagem: 'Falha ao atualizar o pedido'
    });
  }
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
  try {
    const resultado = await adapter.listaClienteCPF(cpf);
    res.status(200).json(resultado);
    
  } catch (err) {
    if( err instanceof CustomError) {
        customErrorToResponse(err, res);
        return;
    }
    res.status(500).json({
        mensagem: 'Falha ao encontrar usuário'
    });
  }
});

// Update
router.put('/', async (req, res) => {
    const adapter = new ClienteAdapter();
    const cliente = req.body;
    
    try {
      const resultado = await adapter.atualizaCliente(cliente);
      res.status(200).json(resultado);
    } catch (err) {
      if( err instanceof CustomError) {
          customErrorToResponse(err, res);
          return;
      }
      res.status(500).json({
          mensagem: 'Falha ao encontrar usuário'
      });
    }
});

// Delete
router.delete('/:cpf', async (req, res) => {
  const adapter = new ClienteAdapter();
  const {cpf} = req.params;
  
  try {
    const resultado = await adapter.deletaCliente(cpf);
    res.status(200).json(resultado);
     
  }catch (err) {
    if( err instanceof CustomError) {
        customErrorToResponse(err, res);
        return;
    }
    res.status(500).json({
        mensagem: 'Falha ao encontrar usuário'
    });
  }
});


export { router };