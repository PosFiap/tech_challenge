import { EStatus } from "../../../modules/common/value-objects/EStatus";
import { IPedidoDetalhadoPresenter, IPedidoDetalhadoPresenterJSON, IPedidoDetalhadoPresenterJSONFormat, IProdutoPedidoDetalhadoPresenter } from "../interfaces/IPedidoDetalhadoPresenter";
import { MoedaReal } from "./value-objects/MoedaReal";

export abstract class PedidoDetalhadoPresenter implements IPedidoDetalhadoPresenter {    
    constructor(
        readonly status: EStatus,
        readonly codigoPedido: number,
        readonly itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
        readonly dataPedido: Date,
        readonly CPFCliente?: string,
        readonly codigoFatura?: string,
    ){}

    abstract format(): Object;

    protected valorTotal(): number {
        return this.itensPedido.reduce((sum, crr) => {
            return sum += crr.valor
        }, 0);
    }
}