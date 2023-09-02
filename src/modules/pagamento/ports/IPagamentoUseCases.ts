import { IFaturaPedido } from "./IFaturaPedido";
import { IPagamentoRepositoryGateway } from "./IPagamentoRegistryGateway";

export interface IPagamentoUseCases {
    confirmaPagamentoFatura(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<IFaturaPedido>

    rejeitaPagamentoFatura(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<IFaturaPedido>
}
