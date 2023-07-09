import { ProdutoDTO } from "../dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../dto/ProdutoOutputDTO";
import { ECategoria } from "../entities/ECategoria";
import { Produto } from "../entities/Produto";
import { IProdutoCrudUseCase } from "../ports/IProdutoCrudUseCase";
import { IProdutoRepository } from "../ports/IProdutoRepository";

export class ProdutoService implements IProdutoCrudUseCase {



    async buscaProdutoPorCategoria(categoria: ECategoria, repository: IProdutoRepository): Promise<Produto[]> {
        return await repository.buscaProdutoPorCategoria(categoria);
    }

    async buscaProdutoPorId(id: number, repository: IProdutoRepository): Promise<ProdutoDTO> {

        const produto = await repository.buscaProdutoPorCodigo(id);

        return produto;
    }

    async registraProduto(newProduto: ProdutoDTO, repository: IProdutoRepository): Promise<ProdutoOutputDTO> {

        const produtoInserido = await repository.registraProduto(newProduto);

        const result: ProdutoOutputDTO = {
            code: 201,
            message: "Novo Produto inserido com sucesso!",
            produto: produtoInserido
        }

        return result;
        
    }

    async atualizaProduto(id: number, produto: ProdutoDTO, repository: IProdutoRepository): Promise<Produto> {
        const produtoAtualizado = await repository.atualizaProduto(id, produto);

        return produtoAtualizado;        
    }

    async deletaProduto(id: number, repository: IProdutoRepository): Promise<Produto> {
        return await repository.deletaProduto(id);
        
    }

}