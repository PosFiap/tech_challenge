export class CPF {
    constructor(readonly valor:string | null) {}

    validaCPF() {
        if(this.valor === null) return true;
        if(this.valor.length != 11 )
            return false;

        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) 
            soma = soma + parseInt(this.valor.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(this.valor.substring(9, 10)) ) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) 
            soma = soma + parseInt(this.valor.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(this.valor.substring(10, 11) ) ) return false;
        return true;
    }
}