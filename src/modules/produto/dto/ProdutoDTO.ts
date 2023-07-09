import { ECategoria } from "../model/ECategoria";

export class ProdutoDTO {
    constructor(
         public nome: string,
         public descricao: string,
         public valor: number,
         public categoria_codigo: ECategoria,
    ){}
}