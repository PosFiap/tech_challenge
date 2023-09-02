import { IPagamentoDetalhadoPresenterFactory } from "../../presenter/interfaces/IPagamentoDetalhadoPresenterFactory";

export interface IPagamentoController {
    atualizaSituacaoPagamentoAceito(id_fatura: string, pagamentoDetalhadoPresenterFactory: IPagamentoDetalhadoPresenterFactory): Promise<Object>;
    atualizaSituacaoPagamentoRejeitado(id_fatura: string, pagamentoDetalhadoPresenterFactory: IPagamentoDetalhadoPresenterFactory): Promise<Object>;
}