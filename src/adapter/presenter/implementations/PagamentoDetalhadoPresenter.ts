import { EStatusPagamento } from "../../../modules/common/value-objects/EStatusPagamento";
import { IPagamentoDetalhadoPresenter } from "../interfaces/IPagamentoDetalhadoPresenter";

export abstract class PagamentoDetalhadoPresenter implements IPagamentoDetalhadoPresenter {    
    constructor(
        readonly codigoPagamento: number,
        readonly codigoPedido: number,
        readonly codigoFatura: string,
        readonly statusPagamento: EStatusPagamento,
        readonly dataCriacao: Date,
        readonly dataAtualizacao: Date,
        readonly CPFCliente?: string,
    ){}

    abstract format(): Object;
}