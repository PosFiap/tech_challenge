import { FaturaIdentificadorVO } from "../model";

export class CriaFaturaPagamentoDTO {
    private _codigo_fatura: FaturaIdentificadorVO;
    constructor(
        codigo_fatura: string,
        readonly codigo_pedido: number
    ){
        this._codigo_fatura = new FaturaIdentificadorVO(codigo_fatura);
    }

    get codigo_fatura() {
        return this._codigo_fatura.fatura_identificador;
    }
}