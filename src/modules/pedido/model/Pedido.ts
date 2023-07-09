import { CustomError, CustomErrorType } from "../../../utils/customError";
import { CPF as CPFVO } from "../../common/value-objects/CPF";
import { EStatus } from "../../common/value-objects/EStatus";
import { Produto } from "./Produto";

export class Pedido {
    private _CPF: CPFVO | null;
    constructor(
        CPF: string | null,
        private _status: EStatus,
        readonly produtosPedido: Array<Produto>,
        readonly codigo: number | null
    ) {
        this._CPF = CPF ? new CPFVO(CPF) : null;
    }

    get status() {
        return this._status;
    }

    get CPF() {
        return this._CPF?.valor;
    }

    get valorTotal(): number {
        return this.produtosPedido.reduce((soma, item) => soma + item.valor, 0)
    }

    atualizaStatus(novoStatus: EStatus) {
        // o status só pode ser atualizado de forma incremental e ser diferente de Aguardando pagamento
        if(novoStatus != this._status + 1 || this._status === EStatus["Aguardando Pagamento"]) {
            throw new CustomError(CustomErrorType.BusinessRuleViolation, "O status indicado não é válido para esse pedido");
        }
        this._status =  novoStatus;
    }
}