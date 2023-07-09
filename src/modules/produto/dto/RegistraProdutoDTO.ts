import { CustomError, CustomErrorType } from "../../../utils/customError";
import { ECategoria } from "../../common/value-objects/ECategoria";

export class RegistraProdutoDTO {
    constructor(
         readonly nome: string,
         readonly descricao: string,
         readonly valor: number,
         readonly categoriaCodigo: ECategoria,
    ){
        this.validaCodigoCategoria();
        this.validaDescricao();
        this.validaNome();
        this.validaValor();
    }

    validaDescricao() {
        if(!this.descricao) throw new CustomError(CustomErrorType.InvalidInput, "Descrição inválida");
    }

    validaNome() {
        if(!this.nome) throw new CustomError(CustomErrorType.InvalidInput, "Nome inválido");
    }

    validaValor() {
        if(this.valor == null || isNaN(this.valor)) {
            throw new CustomError(CustomErrorType.InvalidInput, "Valor inválido");
        }
    }

    validaCodigoCategoria() {
        if(this.categoriaCodigo == null || isNaN(this.categoriaCodigo)) {
            throw new CustomError(CustomErrorType.InvalidInput, "Código de categoria inválido");
        }
    }
}

export class RegistraProdutoOutputDTO {
    constructor(
        readonly codigo: number,
        readonly nome: string,
        readonly descricao: string,
        readonly valor: number,
        readonly categoriaCodigo: ECategoria,
   ){}

   toJSON() {
        return {
            codigo: this.codigo,
            nome: this.nome,
            descricao: this.descricao,
            valor: this.valor,
            categoria_codigo: this.categoriaCodigo,
            categoria: ECategoria[this.categoriaCodigo]
        }
   }
}