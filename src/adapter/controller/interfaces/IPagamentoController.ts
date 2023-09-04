import { EStatusPagamento } from "../../../modules/common/value-objects";
import { IPagamentoRepositoryGateway } from "../../../modules/pagamento";
import { IPedidoRepositoryGateway, IPedidoUseCases } from "../../../modules/pedido";

export class ConfirmaPagamentoEEnviaPedidoOutput {
    constructor(
        readonly fatura_id: string,
        readonly data_criacao: Date,
        readonly data_atualizacao: Date,
        readonly situacao: EStatusPagamento,
        readonly pedido_codigo: number,
        readonly pedido_cpf: string | null,
    ){}
}

export class RejeitaPagamentoOutput {
    constructor(
        readonly fatura_id: string,
        readonly data_criacao: Date,
        readonly data_atualizacao: Date,
        readonly situacao: EStatusPagamento,
        readonly pedido_codigo: number,
        readonly pedido_cpf: string | null,
    ){}
}

export class VerificaSituacaoPagamentoOutput {
    constructor(
        readonly fatura_id: string,
        readonly data_criacao: Date,
        readonly data_atualizacao: Date,
        readonly situacao: EStatusPagamento,
        readonly pedido_codigo: number,
        readonly pedido_cpf: string | null,
    ){}
}

export interface IPagamentoController {
    confirmaPagamentoEEnviaPedido(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway, pedidoRepositoryGateway: IPedidoRepositoryGateway, pedidoUseCases: IPedidoUseCases): Promise<ConfirmaPagamentoEEnviaPedidoOutput>;
    rejeitaPagamento(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<RejeitaPagamentoOutput>;
    verificaSituacaoPagamento(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<VerificaSituacaoPagamentoOutput>;
}