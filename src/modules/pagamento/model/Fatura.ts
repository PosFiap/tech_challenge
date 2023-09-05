import { EStatusPagamento } from "../../common/value-objects/EStatusPagamento";
import { Pedido } from "./Pedido";
import { FaturaIdentificadorVO } from "./value-objects/FaturaIdentificador";

export class Fatura {
    private _codigo: FaturaIdentificadorVO;

    constructor(
        codigo: string,
        readonly status: EStatusPagamento,
        readonly dataCriacao: Date,
        readonly dataAtualizacao: Date,
        readonly pedido: Pedido
    ) {
        this._codigo = new FaturaIdentificadorVO(codigo);
    }

    get codigo() {
        return this._codigo.fatura_identificador;
    }
}