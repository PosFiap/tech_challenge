import { EStatus } from "../../../modules/common/value-objects/EStatus";
import { IPedidoDetalhadoPresenterJSON, IPedidoDetalhadoPresenterJSONFormat, IProdutoPedidoDetalhadoPresenter } from "../interfaces/IPedidoDetalhadoPresenter";
import { PedidoDetalhadoPresenter } from "./PedidoDetalhadoPresenter";
import { CPF } from "./value-objects/CPF";
import { DataHora } from "./value-objects/DataHora";
import { MoedaReal } from "./value-objects/MoedaReal";

export class PedidoDetalhadoPresenterJSON extends PedidoDetalhadoPresenter implements IPedidoDetalhadoPresenterJSON {
    
    format(): IPedidoDetalhadoPresenterJSONFormat {
        const valorTotal = this.valorTotal();
        const json: IPedidoDetalhadoPresenterJSONFormat = {
            status: EStatus[this.status],
            codigo_fatura: this.codigoFatura,
            data: new DataHora(this.dataPedido).formataData(),
            CPF_cliente: this.CPFCliente ? new CPF(this.CPFCliente).formataCPF() : "",
            numero_pedido: this.codigoPedido.toString(),
            valor_total: (new MoedaReal(valorTotal)).formataMoeda(),
            itens_pedido: this.itensPedido.map((item) => ({
                nome: item.nome,
                valor: (new MoedaReal(item.valor)).formataMoeda()
            }))
        }

        if(!this.codigoFatura) {
            delete json.codigo_fatura;
        }

        return json;
    }

}