import { FaturaIdentificadorVO } from "../model/value-objects/FaturaIdentificador";

export class RejeitaPagamentoFaturaDTO {
    private _fatura_id: FaturaIdentificadorVO;
    constructor(
        fatura_id: string
    ){
        this._fatura_id = new FaturaIdentificadorVO(fatura_id);
    }

    get fatura_id() {
        return this._fatura_id.fatura_identificador;
    }
}