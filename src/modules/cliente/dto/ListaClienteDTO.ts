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
        readonly cpf: string,
        readonly email: string,
        readonly nome: string
    ){}
}

export class ListaClienteOutputDTO {
    constructor(
        readonly cliente: ItemListaCliente
    ) {}

    public toJSON = () : any => {
        return {
            cpf: this.cliente.cpf,
            nome: this.cliente.nome,
            email: this.cliente.email
        }
    }
}