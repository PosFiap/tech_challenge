import { CPF as CPFVO } from '../../common/value-objects';

export class Pedido {
    private readonly _CPF: CPFVO | null;
    constructor (
        readonly codigo: number,
        CPF: string | null,
    ) {
        this._CPF = CPF ? new CPFVO(CPF) : null
    }

    get CPF (): string | null {
        return this._CPF?.valor ?? null
    }
}
