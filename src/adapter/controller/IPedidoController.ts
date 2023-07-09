import { AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO, InserePedidoOutputDTO } from "../../modules/pedido";

export interface IPedidoController {
    pedidoService: IPedidoService;

    atualizaStatusPedido(data: {codigoPedido: number, codigoStatus: number}): Promise<AtualizaStatusPedidoOutputDTO>;

    listaPedidos(): Promise<Array<ItemListaPedidoOutputDTO>>;

    registraPedido(data: {cpf: string | null, produtoPedido: {codigo: number}[]}): Promise<InserePedidoOutputDTO>;
}