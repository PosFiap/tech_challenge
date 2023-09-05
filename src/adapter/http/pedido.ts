import { Router } from "express";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";
import { IPedidoController } from "../controller/interfaces/IPedidoController";
import { AtualizaStatusPedidoOutputDTO, IPedidoRepositoryGateway } from "../../modules/pedido";
import { PedidoDetalhadoPresenterFactory } from "../presenter/implementations/PedidoDetalhadoPresenterFactory";
import { PrismaPagamentoRepositoryGateway } from "../gateways/repository/PrismaPagamentoRepositoryGateway";
import { PagamentoUseCases } from "../../modules/pagamento/PagamentoUseCases";
import { ServicoPagamentoGatewayGenerico } from "../gateways/servicos-pagamento/implementacoes/ServicoPagamentoGenerico";

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
                const pedido = await this.pedidoController.registraPedido(
                    registraPedidoInput,
                    this.defaultPedidoRepositoryGateway,
                    new PrismaPagamentoRepositoryGateway(),
                    new PagamentoUseCases(),
                    new ServicoPagamentoGatewayGenerico()
                );

                const pedidoDetalhado = PedidoDetalhadoPresenterFactory.create(
                    pedido.status,
                    pedido.codigoPedido,
                    pedido.produtos,
                    pedido.dataPedido,
                    pedido.cpf?.valor,
                    pedido.codigoFatura
                  ).format();

                res.status(201).json(pedidoDetalhado);
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
                const listaPedidos = (await this.pedidoController.listaPedidosAndamento(this.defaultPedidoRepositoryGateway)).pedidos;

                const pedidoDetalhados = listaPedidos.map((pedido) => {
                    return PedidoDetalhadoPresenterFactory.create(
                        pedido.status,
                        pedido.codigoPedido,
                        pedido.produtos,
                        pedido.dataPedido,
                        pedido.cpf?.valor
                      ).format();
                });

                res.status(200).json(pedidoDetalhados);
            } catch (err) {
                console.error(err);
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