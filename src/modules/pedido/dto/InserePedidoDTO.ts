import { CustomError, CustomErrorType } from "../../../utils/customError";
import { CPF as CPFVO } from "../../common/value-objects/CPF";

export class InserePedidoDTO {
    private _CPF: CPFVO;
    constructor(
        CPF: string | null,
        readonly produtosPedidoCodigo: Array<{codigo: number}>
    ){
        this._CPF = new CPFVO(CPF);
    }

    public get CPF() {
        return this._CPF.valor;
    }

    private validaItemDePedido(): boolean {
        if(!this.produtosPedidoCodigo) return false;
        if(this.produtosPedidoCodigo.length === 0) return false;
        if(this.produtosPedidoCodigo.some((item) => {
            return typeof item.codigo !== 'number' || item.codigo <= 0
        })) return false;
        return true;
    }

    public validaDTO(): void {
        const erros: Array<String> = [];
        if(!this.validaItemDePedido()) erros.push('Um ou mais itens do pedido é inválido');
        if(!this._CPF.validaCPF()) erros.push('O CPF informado é inválido');
        if(erros.length > 0) {
            throw new CustomError(CustomErrorType.InvalidInputDTO, erros.join("\n"));
        }
    }
}
