import { Router } from "express";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";
import { IPedidoController } from "../controller/interfaces/IPedidoController";
import { AtualizaStatusPedidoOutputDTO, IPedidoRepositoryGateway } from "../../modules/pedido";
import { PedidoDetalhadoPresenterFactory } from "../presenter/implementations/PedidoDetalhadoPresenterFactory";

export class PedidoHTTP {
    private router: Router;

    constructor(
        private readonly pedidoController: IPedidoController,
        private readonly defaultPedidoRepositoryGateway: IPedidoRepositoryGateway
    ){
        this.router = Router();
        this.setRoutes();
    };

    private setRoutes() {
        this.router.post('/', async (req, res) => { 
            const { CPF, itemDePedido} = req.body;
            try{
                const registraPedidoInput = {
                    cpf: (typeof CPF === 'number' ? CPF.toString() : CPF) || null,
                    produtoPedido: itemDePedido,
                };
                const resultado = await this.pedidoController.registraPedido(
                    registraPedidoInput,
                    PedidoDetalhadoPresenterFactory,
                    this.defaultPedidoRepositoryGateway
                );
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
        
        this.router.patch('/:codigoPedido/:status', async (req, res) => {
            const codigoPedido = parseInt(req.params['codigoPedido'] as string, 10);
            const status = req.params['status'] as string;
            const moveStatus = (codigoPedido:number, status: string): Promise<AtualizaStatusPedidoOutputDTO> => {
                switch(status){
                    case "em-preparacao":
                        return this.pedidoController.moveStatusEmPreparacao({codigoPedido}, this.defaultPedidoRepositoryGateway)
                    case "pronto":
                        return this.pedidoController.moveStatusPronto({codigoPedido}, this.defaultPedidoRepositoryGateway)
                    case "finalizado":
                        return this.pedidoController.moveStatusFinalizado({codigoPedido}, this.defaultPedidoRepositoryGateway)
                }
                throw new CustomError(CustomErrorType.BusinessRuleViolation, "Status inválido");
            }
            try {
                const resultado = await moveStatus(codigoPedido, status);
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
                const listaPedidos = await this.pedidoController.listaPedidos(this.defaultPedidoRepositoryGateway);
                res.status(200).json(listaPedidos.map((pedido) => {
                    return {
                        CPF: pedido.CPF,
                        codigo: pedido.codigo,
                        status: pedido.status,
                        valorTotal: pedido.valorTotal,
                        quantidadeItens: pedido.quantidadeProdutosPedido,
                        produtos: pedido.produtosPedido
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