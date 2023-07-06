import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO } from "../dto";

export interface IAtualizaStatusPedidoUseCase {
    atualizaStatus(data: AtualizaStatusPedidoDTO): Promise<AtualizaStatusPedidoOutputDTO>;
}