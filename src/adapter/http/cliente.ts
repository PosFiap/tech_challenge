import { Router } from "express";
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

      // Read
      this.router.get('/', async (_req, res) => {
        try {
          const resultado = await this.clienteController.listaCliente();
          
          res.status(200).json(resultado);
        } catch (err) {
          if( err instanceof CustomError) {
              customErrorToResponse(err, res);
              return;
          }
          res.status(500).json({
              mensagem: 'Falha ao listar os clientes'
          });
        }
      });

      // // Read Only CPF
      this.router.get('/:cpf', async (req, res) => {
        const { cpf } = req.params;
        try {
          const resultado = await this.clienteController.buscaClienteCPF(cpf);
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
      this.router.put('/', async (req, res) => {
          const cliente = req.body;
          
          try {
            const resultado = await this.clienteController.atualizaCliente(cliente);
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
      this.router.delete('/:cpf', async (req, res) => {
        const {cpf} = req.params;
        
        try {
          const resultado = await this.clienteController.deletaCliente(cpf);
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
  }

  getRouter() {
      return this.router;
  }
}