import { InserePedidoOutputDTO } from "../../modules/pedido/dto/InserePedidoOutputDTO";
import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO, InserePedidoDTO, PedidoService } from "../../modules/pedido";
import { IPedidoController } from "./IPedidoController";
import { PrismaPedidoRepository } from "../persistence/PedidoRepository";

export class PedidoController implements IPedidoController {

    constructor(
        readonly pedidoService: IPedidoService
    ) {}

    static create(configuration:string = 'default'): PedidoController {
        if(configuration === 'default') {
            const repository = new PrismaPedidoRepository();
            const service = new PedidoService(repository);
            return new PedidoController(service);
        }
        throw new Error('Invalid Configuration Setup');
    }

    async atualizaStatusPedido(data: { codigoPedido: number; codigoStatus: number; }): Promise<AtualizaStatusPedidoOutputDTO> {
        try {
            const inputDTO = new AtualizaStatusPedidoDTO(
                data.codigoPedido,
                data.codigoStatus
            )
            const result = await this.pedidoService.atualizaStatus(inputDTO);
            return result;
        } catch(err) {
            throw err;
        }
    }

    async registraPedido(data: { cpf: string | null; produtoPedido: {codigo: number}[]; }): Promise<InserePedidoOutputDTO> {
        try{
            const inputDTO = new InserePedidoDTO(data.cpf, data.produtoPedido);
            const pedidoCompleto = await this.pedidoService.registraPedido(inputDTO);
            return pedidoCompleto;
        } catch(err) {
            throw err;
        }
    }

    listaPedidos(): Promise<Array<ItemListaPedidoOutputDTO>> {
        try{
            return this.pedidoService.listaPedidos();
        } catch(err) {
            throw err;
        }
    }
}