import { CustomError, CustomErrorType } from "../../../utils/customError";
import { CommonDTO } from "../../common/dto/CommonDTO";
import { CPF as CPFVO } from "../../common/value-objects/CPF";

export class RegistraClienteDTO extends CommonDTO {

    private readonly _CPF: CPFVO;
    constructor(
        CPF: string,
        readonly email: string,
        readonly nome: string
    ){
        super();
        this._CPF = new CPFVO(CPF);
        this.validaDTO();
    }

    public get CPF() {
        return this._CPF.valor;
    }

    protected validaDTO() {
        if(!this.email)
            throw new CustomError(CustomErrorType.InvalidInput, "E-mail inválido");

        if(!this.nome)
            throw new CustomError(CustomErrorType.InvalidInput, "Nome inválido");
    }
}

export class RegistraClienteOutputDTO {
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

    public toJSON = () : any => {
        return {
            nome: this.nome,
            email: this.email,
            CPF: this.CPF
        };
    }
}
