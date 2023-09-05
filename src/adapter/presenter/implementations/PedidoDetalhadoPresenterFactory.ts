import { EStatus } from "../../../modules/common/value-objects/EStatus";
import { IPedidoDetalhadoPresenter, IProdutoPedidoDetalhadoPresenter } from "../interfaces/IPedidoDetalhadoPresenter";
import { IPedidoDetalhadoPresenterFactory } from "../interfaces/IPedidoDetalhadoPresenterFactory";
import { PedidoDetalhadoPresenterJSON } from "./PedidoDetalhadoPresenterJSON";
import { CPF } from "./value-objects/CPF";

export abstract class PedidoDetalhadoPresenterFactory implements IPedidoDetalhadoPresenterFactory {
    
    // Criada apenas por limitação da linguagem que não reconhece classes estáticas e pede implementação
    create(status: EStatus, codigoPedido: number, itensPedido: IProdutoPedidoDetalhadoPresenter[], dataPedido: Date, CPFCliente?: string | undefined): IPedidoDetalhadoPresenter {
        throw new Error("Method not implemented.");
    }
    
    static create(
        status: EStatus,
        codigoPedido: number,
        itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
        dataPedido: Date,
        CPFCliente?: string,
        codigoFatura?: string,
    ): IPedidoDetalhadoPresenter {
        return new PedidoDetalhadoPresenterJSON(
            status,
            codigoPedido,
            itensPedido,
            dataPedido,
            CPFCliente,
            codigoFatura
        )
    }

    
}