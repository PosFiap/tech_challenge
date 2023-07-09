import { ECategoria } from "../model/ECategoria";

export class ProdutoDTO {
    constructor(
         public nome: string,
         public descricao: string,
         public valor: number,
         public categoria_codigo: ECategoria,
    ){}

    validaCodigoCategoria() {
        if(this.codigoCategoria == null || isNaN(this.codigoCategoria)) {
            throw new CustomError(CustomErrorType.InvalidInput, "Código de categoria inválido");
        }
    }
}