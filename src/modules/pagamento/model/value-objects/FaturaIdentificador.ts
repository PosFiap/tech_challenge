import { CustomError, CustomErrorType } from "../../../../utils";

export class FaturaIdentificadorVO {
    constructor(
        readonly fatura_identificador: string
    ){
        if(!FaturaIdentificadorVO.validaIdentificador(fatura_identificador))
            throw new CustomError(CustomErrorType.EntityViolation, 'Identificador de fatura inválido');
    }

    static validaIdentificador(fatura_identificador: string) {
        if(typeof fatura_identificador !== "string") return false;
        if(!fatura_identificador) return false;
        return true;
    }

}