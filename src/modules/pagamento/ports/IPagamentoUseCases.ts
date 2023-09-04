import { ConfirmaPagamentoFaturaOutputDTO, ConfirmaPagamentoFaturaDTO, ObtemSituacaoPagamentoFaturaDTO, ObtemSituacaoPagamentoFaturaOutputDTO, RejeitaPagamentoFaturaOutputDTO } from "../dto";
import { IPagamentoRepositoryGateway } from "./IPagamentoRegistryGateway";

export interface IPagamentoUseCases {
    confirmaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO>
    rejeitaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<RejeitaPagamentoFaturaOutputDTO>
    obtemSituacaoPagamentoFatura(data: ObtemSituacaoPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ObtemSituacaoPagamentoFaturaOutputDTO>
}
