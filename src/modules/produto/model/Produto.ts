import { CustomError, CustomErrorType } from "../../../utils/customError";
import { ECategoria } from "./ECategoria";

export class Produto {
    constructor(
        readonly codigo: number | null,
        readonly nome: string,
        readonly descricao: string,
        readonly valor: number,
        readonly categoria_codigo: ECategoria,
    ){
        this.validaValor();
        this.validaCategoriaCodigo();
        this.validaNome();
        this.validaDescricao();
    }

    private validaNome() {
        if(!this.nome)  throw new CustomError(
            CustomErrorType.BusinessRuleViolation,
            "Nome inválido"
        )
    }

    private validaDescricao() {
        if(!this.descricao)  throw new CustomError(
            CustomErrorType.BusinessRuleViolation,
            "Descrição inválida"
        )
    }

    private validaCategoriaCodigo() {
        if(this.categoria_codigo >= 4 || this.categoria_codigo < 0) throw new CustomError(
            CustomErrorType.BusinessRuleViolation,
            "Código de categoria inválida"
        )
    }
    private validaValor() {
        if(this.valor < 0) throw new CustomError(
            CustomErrorType.BusinessRuleViolation,
            "Um produto não pode conter um valor negativo"
        )
    }
}