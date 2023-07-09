import { CustomError, CustomErrorType } from "../../../utils/customError";
import { CPF as CPFVO } from "../../common/value-objects/CPF";
import { EStatus } from "../../common/value-objects/EStatus";
import { Produto } from "./Produto";

export class Pedido {
    private _CPF: CPFVO;
    constructor(
        CPF: string | null,
        private _status: EStatus,
        readonly produtosPedido: Array<Produto>,
        readonly codigo: number | null
    ) {
        this._CPF = new CPFVO(CPF);
    }

    get status() {
        return this._status;
    }

    get CPF() {
        return this._CPF.valor;
    }

    atualizaStatus(novoStatus: EStatus) {
        if(novoStatus <= this._status) {
            throw new CustomError(CustomErrorType.BusinessRuleViolation, "O status indicado não é válido para esse pedido");
        }
        this._status =  novoStatus;
    }
}