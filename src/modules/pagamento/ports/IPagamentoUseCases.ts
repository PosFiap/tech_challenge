import { IPedidoRepositoryGateway } from "../../pedido";
import { ConfirmaPagamentoFaturaOutputDTO, ConfirmaPagamentoFaturaDTO } from "../dto";
import { IPagamentoRepositoryGateway } from "./IPagamentoRegistryGateway";

export interface IPagamentoUseCases {
    confirmaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO>
    rejeitaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO>
}
