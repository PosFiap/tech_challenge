import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";
import { CustomError } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";
import { IClienteController } from "../controller/IClienteController";

export class ClienteHTTP {
  private router: Router;

  constructor(
      private readonly clienteController: IClienteController
  ){
      this.router = Router();
      this.setRoutes();
  };

  private setRoutes() {
      // Create
      this.router.post('/', async (req, res) => {
        const cliente = req.body;
        try {
          const resultado = await this.clienteController.registraCliente(cliente);
          
          res.status(201).json(resultado);
        } catch (err) {
          if( err instanceof CustomError) {
              customErrorToResponse(err, res);
              return;
          }
          res.status(500).json({
              mensagem: 'Falha ao registrar o cliente'
          });
        }
      });

      /*// Read
      router.get('/', async (_req, res) => {
        const adapter = new ClienteController();
        const resultado = await adapter.listaCliente();
        res.status(200).json(resultado);
      });

      // Read Only CPF
      router.get('/:cpf', async (req, res) => {
        const adapter = new ClienteController();
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
          const adapter = new ClienteController();
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
        const adapter = new ClienteController();
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
      });*/
  }

  getRouter() {
      return this.router;
  }
}