import { CustomError, CustomErrorType } from "../../../utils";

export class ConfirmaPagamentoFaturaDTO {
    constructor(
        readonly fatura_id: string
    ){
        if(!ConfirmaPagamentoFaturaDTO.validaIdentificador(fatura_id))
            throw new CustomError(CustomErrorType.InvalidInput, "Identificador de fatura inválido");
    }

    static validaIdentificador(fatura_id: string) {
        if(!fatura_id)
            return false;
        return true;
    }
}