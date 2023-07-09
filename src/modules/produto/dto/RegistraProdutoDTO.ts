import { ECategoria } from "../../common/value-objects/ECategoria";

export class RegistraProdutoDTO {
    constructor(
         readonly nome: string,
         readonly descricao: string,
         readonly valor: number,
         readonly categoriaCodigo: ECategoria,
    ){}
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