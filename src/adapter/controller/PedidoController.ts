import { PedidoOutputDTO } from "../../modules/pedido/dto/PedidoOutputDTO";
import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO, PedidoDTO, PedidoService } from "../../modules/pedido";
import { PedidoRepository } from "../persistence/PedidoRepository";
import { IPedidoController } from "./IPedidoController";

export class PedidoController implements IPedidoController {

    constructor(
        readonly pedidoService: IPedidoService
    ) {}

    static create(configuration:string = 'default'): PedidoController {
        if(configuration === 'default') {
            const repository = new PedidoRepository();
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

    async registraPedido(data: { cpf: string | null; produtoPedido: {codigo: number}[]; }): Promise<PedidoOutputDTO> {
        try{
            const inputDTO = new PedidoDTO(data.cpf, data.produtoPedido);
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