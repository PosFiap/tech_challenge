import { CustomError, CustomErrorType } from "../../../../utils";

export class CPF {
    constructor(private readonly valor: string){
        if(!CPF.validaCPF(valor))
            throw new CustomError(CustomErrorType.InvalidInput, "O CPF é inválido");
    }

    // Valida apenas para formatação, presenter não é responsável por régra de negócio
    static validaCPF(valor: string) {
        if(valor === null || valor === undefined)
            return false;
        if(valor.length != 11)
            return false;
        return true;
    }

    formataCPF() {
        return `${this.valor.substring(0, 9).replace(/(\d{3})(?!$)/g, "$1.")}-${this.valor.substring(9)}`;
    }
}