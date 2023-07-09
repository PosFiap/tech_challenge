import { ECategoria } from "../model/ECategoria";

export class RegistraProdutoDTO {
    constructor(
         readonly nome: string,
         readonly descricao: string,
         readonly valor: number,
         readonly categoria_codigo: ECategoria,
    ){}
}

export class RegistraProdutoOutputDTO {
    constructor(
        readonly codigo: number,
        readonly nome: string,
        readonly descricao: string,
        readonly valor: number,
        readonly categoria_codigo: ECategoria,
   ){}

   toJSON() {
        return {
            codigo: this.codigo,
            nome: this.nome,
            descricao: this.descricao,
            valor: this.valor,
            categoria_codigo: this.categoria_codigo,
            categoria: ECategoria[this.categoria_codigo]
        }
   }
}