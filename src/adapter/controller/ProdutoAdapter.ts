import { ProdutoDTO } from "../../modules/produto/dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../../modules/produto/dto/ProdutoOutputDTO";
import { ECategoria } from "../../modules/produto/entities/ECategoria";
import { ProdutoService } from "../../modules/produto/services/ProdutoService";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { GenericOutputErrorDTO } from "../../utils/dto/GenericOutputDTO";
import { ProdutoRepository } from "../persistence/ProdutoRepository";


export class ProdutoAdapter {

    constructor(
        private service: ProdutoService, 
        private repository: ProdutoRepository) {}

    buscaProdutoPorId(id: number) {
        const result = this.service.buscaProdutoPorId(id, this.repository);

        return result;
    }

    buscaProdutoPorCategoria(categoria: number) {
        const result = this.service.buscaProdutoPorCategoria(categoria, this.repository);

        return result;
    }

    registraProduto(produtoDTO: ProdutoDTO): ProdutoOutputDTO {
        const result = this.service.registraProduto(produtoDTO, this.repository);

        return result;
    }

    atualizaProduto(id: number, produto: ProdutoDTO): ProdutoOutputDTO | GenericOutputErrorDTO {

        try {
            const result = this.service.atualizaProduto(id, produto, this.repository);

            return result;
        } catch (CustomError: any) {
            return new GenericOutputErrorDTO(CustomError.type, CustomErrorType[CustomError.type], CustomError.message)
        }

        
    }

    deletaProduto(id:number) {
        const result = this.service.deletaProduto(id, this.repository);

        return result;
    }
}