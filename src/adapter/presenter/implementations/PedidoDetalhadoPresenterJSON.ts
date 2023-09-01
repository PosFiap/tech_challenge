import { EStatus } from "../../../modules/common/value-objects/EStatus";
import { IPedidoDetalhadoPresenterJSON, IPedidoDetalhadoPresenterJSONFormat, IProdutoPedidoDetalhadoPresenter } from "../interfaces/IPedidoDetalhadoPresenter";
import { PedidoDetalhadoPresenter } from "./PedidoDetalhadoPresenter";
import { MoedaReal } from "./value-objects/MoedaReal";

export class PedidoDetalhadoPresenterJSON extends PedidoDetalhadoPresenter implements IPedidoDetalhadoPresenterJSON {
    
    format(): IPedidoDetalhadoPresenterJSONFormat {
        const valorTotal = this.valorTotal();
        const json: IPedidoDetalhadoPresenterJSONFormat = {
            status: EStatus[this.status],
            numero_pedido: this.codigoPedido.toString(),
            valor_total: (new MoedaReal(valorTotal)).formataMoeda(),
            itens_pedido: this.itensPedido.map((item) => ({
                nome: item.nome,
                valor: (new MoedaReal(item.valor)).formataMoeda()
            }))
        }

        if(this.CPFCliente) {
            json.CPF_cliente = this.CPFCliente;
        }

        return json;
    }

}