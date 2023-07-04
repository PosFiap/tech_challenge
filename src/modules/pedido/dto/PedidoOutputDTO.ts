import { EStatus } from "../value-objects/EStatus";

export interface PedidoOutputDTO {
    status: EStatus,
    codigo: number,
    valor: number
}