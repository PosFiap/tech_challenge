import { CustomError, CustomErrorType } from "../../../utils/customError";
import { CommonDTO } from "../../common/dto/CommonDTO";
import { CPF as CPFVO } from "../../common/value-objects/CPF";

export class ListaClienteDTO extends CommonDTO {
    private readonly _CPF: CPFVO;
    constructor(
        CPF: string,
    ){
        super();
        this._CPF = new CPFVO(CPF);
        this.validaDTO();
    }

    public get CPF() {
        return this._CPF.valor;
    }

    protected validaDTO(): void {
        if (!this.CPF) {
            throw new CustomError(CustomErrorType.InvalidInput, "CPF deve ser passado")
        }
    }
}

export class ItemListaCliente {
    constructor(
        readonly CPF: string,
        readonly email: string,
        readonly nome: string
    ){}
}

export class ListaClientesOutputDTO {
  constructor (
    readonly itemListaCliente: ItemListaCliente[]
  ) {}

    public toJSON = () : any => {
        return {
            quantidade: this.itemListaCliente.length,
            clientes: this.itemListaCliente
        }
    }
}
