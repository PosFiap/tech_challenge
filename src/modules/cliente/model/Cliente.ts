import { CPF as CPFVO } from "../../common/value-objects/CPF";

export class Cliente {
    private _CPF: CPFVO;
    constructor(
        CPF: string,
        readonly email: string,
        readonly nome: string
    ) {
        this._CPF = new CPFVO(CPF);
    }

    public get CPF() {
        return this._CPF.valor;
    }

}