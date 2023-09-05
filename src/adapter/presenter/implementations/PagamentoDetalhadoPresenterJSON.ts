import { EStatusPagamento } from "../../../modules/common/value-objects/EStatusPagamento";
import { IPagamentoDetalhadoPresenterJSON, IPagamentoDetalhadoPresenterJSONFormat } from "../interfaces/IPagamentoDetalhadoPresenter";
import { PagamentoDetalhadoPresenter } from "./PagamentoDetalhadoPresenter";
import { CPF } from "./value-objects/CPF";
import { DataHora } from "./value-objects/DataHora";

export class PagamentoDetalhadoPresenterJSON extends PagamentoDetalhadoPresenter implements IPagamentoDetalhadoPresenterJSON {
    
    format(): IPagamentoDetalhadoPresenterJSONFormat {
        const json: IPagamentoDetalhadoPresenterJSONFormat = {
            codigo_fatura: this.codigoFatura,
            data_atualizacao: new DataHora(this.dataAtualizacao).formataData(),
            data_fatura: new DataHora(this.dataCriacao).formataData(),
            numero_pedido: this.codigoPedido.toString(),
            status: EStatusPagamento[this.statusPagamento]
        }

        if(this.CPFCliente) {
            json.CPF_cliente = new CPF(this.CPFCliente).formataCPF();
        }

        return json;
    }

}