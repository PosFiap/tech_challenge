import { Produto } from "@prisma/client";
import { ProdutoDTO } from "../../modules/produto/dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../../modules/produto/dto/ProdutoOutputDTO";
import { ECategoria } from "../../modules/produto/model/ECategoria";
import { ProdutoService } from "../../modules/produto/services/ProdutoService";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { GenericOutputErrorDTO } from "../../utils/dto/GenericOutputDTO";
import { ProdutoRepository } from "../persistence/ProdutoRepository";


export class ProdutoAdapter {

    constructor(
        private service: ProdutoService, 
        private repository: ProdutoRepository) {}

    async buscaProdutoPorId(id: number) {

        try {
            const result = await this.service.buscaProdutoPorId(id, this.repository);
            return result;
        } catch (CustomError: any) {
            return new GenericOutputErrorDTO(CustomError.type, CustomErrorType[CustomError.type], CustomError.message)
        }

       
    }

    async buscaProdutoPorCategoria(categoria: number) {
        const result = await this.service.buscaProdutoPorCategoria(categoria, this.repository);

        return result;
    }

    async registraProduto(produtoDTO: ProdutoDTO): Promise<ProdutoOutputDTO> {
        const result = await this.service.registraProduto(produtoDTO, this.repository);

        return result;
    }

    async atualizaProduto(id: number, produto: ProdutoDTO) {

        try {
            const result = await this.service.atualizaProduto(id, produto, this.repository);
            return result;
        } catch (CustomError: any) {
            return new GenericOutputErrorDTO(CustomError.type, CustomErrorType[CustomError.type], CustomError.message)
        }

        
    }

    async deletaProduto(id:number) {

        try {
            const result = await this.service.deletaProduto(id, this.repository);
            return result;
        } catch (CustomError: any) {
            return new GenericOutputErrorDTO(CustomError.type, CustomErrorType[CustomError.type], CustomError.message)
        }

       
    }
}