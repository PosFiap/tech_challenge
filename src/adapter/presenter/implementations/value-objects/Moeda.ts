import { CustomError, CustomErrorType } from "../../../../utils";

export abstract class Moeda {
    constructor (readonly valor: number) {
        if(!Moeda.validaValor(valor))
            throw new CustomError(CustomErrorType.InvalidInput, 'Valor monetário inválido');
    }

    abstract formataMoeda(): string;

    protected transformaValorEmTexto(): string {
        const fixedValor = this.valor.toFixed(2);
        const textValor = fixedValor.toString();
        return textValor;
    }

    private static validaValor(valor: number) {
        if(valor === null || valor === undefined)
            return false;
        if(valor < 0)
            return false;
        return true;
    }
}
