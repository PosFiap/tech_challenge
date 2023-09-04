import { EStatusPagamento } from "../../../modules/common/value-objects/EStatusPagamento";
import { IPagamentoDetalhadoPresenter } from "../interfaces/IPagamentoDetalhadoPresenter";
import { IPagamentoDetalhadoPresenterFactory } from "../interfaces/IPagamentoDetalhadoPresenterFactory";
import { PagamentoDetalhadoPresenterJSON } from "./PagamentoDetalhadoPresenterJSON";
import { PedidoDetalhadoPresenterJSON } from "./PedidoDetalhadoPresenterJSON";

export abstract class PagamentoDetalhadoPresenterFactory implements IPagamentoDetalhadoPresenterFactory {
    
    // Criada apenas por limitação da linguagem que não reconhece classes estáticas e pede implementação
    create(
        codigoPedido: number,
        codigoFatura: string,
        situacao: EStatusPagamento,
        dataCriacao: Date,
        dataAtualizacao: Date,
        CPFCliente: string | null
    ): IPagamentoDetalhadoPresenter {
        throw new Error("Method not implemented.");
    }
    
    static create(
        codigoPedido: number,
        codigoFatura: string,
        situacao: EStatusPagamento,
        dataCriacao: Date,
        dataAtualizacao: Date,
        CPFCliente: string | null
    ): IPagamentoDetalhadoPresenter {
        return new PagamentoDetalhadoPresenterJSON(
            codigoPedido,
            codigoFatura,
            situacao,
            dataCriacao,
            dataAtualizacao,
            CPFCliente
        )
    }

    
}