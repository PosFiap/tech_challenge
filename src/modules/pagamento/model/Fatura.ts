import { EStatusPagamento } from "../../common/value-objects/EStatusPagamento";
import { Pedido } from "./Pedido";

export class Fatura {
    constructor(
        readonly codigo: string,
        readonly status: EStatusPagamento,
        readonly dataCriacao: Date,
        readonly dataAtualizacao: Date,
        readonly pedido: Pedido
    ) {}
}