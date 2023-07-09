import { Router } from "express";
import { CustomError } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";
import { IPedidoController } from "../controller/IPedidoController";

export class PedidoHTTP {
    private router: Router;

    constructor(
        private readonly pedidoController: IPedidoController
    ){
        this.router = Router();
        this.setRoutes();
    };

    private setRoutes() {
        this.router.post('/', async (req, res) => { 
            const { CPF, itemDePedido} = req.body;
            try{
                const resultado = await this.pedidoController.registraPedido({
                    cpf: (typeof CPF === 'number' ? CPF.toString() : CPF) || null,
                    produtoPedido: itemDePedido
                });
                res.status(201).json(resultado);
            } catch (err) {
                if( err instanceof CustomError) {
                    customErrorToResponse(err, res);
                    return;
                }
                res.status(500).json({
                    mensagem: 'Falha ao registrar o pedido'
                });
            }
        });
        
        this.router.patch('/:codigoPedido', async (req, res) => {
            const codigoPedido = parseInt(req.params['codigoPedido'] as string, 10);
            const codigoStatus = parseInt(req.body.codigoStatus as string, 10);
            try {
                const resultado = await this.pedidoController.atualizaStatusPedido({
                    codigoPedido,
                    codigoStatus
                });
                res.status(200).json({
                    status: resultado.status,
                    codigoPedido: resultado.codigoPedido
                });
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
        
        this.router.get('/', async (req, res) => {
            try{
                const listaPedidos = await this.pedidoController.listaPedidos();
                res.status(200).json(listaPedidos.map((pedido) => {
                    return {
                        CPF: pedido.CPF,
                        codigo: pedido.codigo,
                        status: pedido.status,
                        valorTotal: pedido.valorTotal,
                        quantidadeItens: pedido.quantidadeProdutosPedido,
                        itens: pedido.produtosPedido
                    }
                }));
            } catch (err) {
                res.status(500).json({
                    mensagem: 'Falha ao recuperar os pedidos'
                });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}