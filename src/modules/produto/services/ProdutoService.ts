import { ProdutoDTO } from "../dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../dto/ProdutoOutputDTO";
import { ECategoria } from "../entities/ECategoria";
import { Produto } from "../entities/Produto";
import { IProdutoCrudUseCase } from "../ports/IProdutoCrudUseCase";
import { IProdutoRepository } from "../ports/IProdutoRegistry";

export class ProdutoService implements IProdutoCrudUseCase {



    buscaProdutoPorCategoria(categoria: ECategoria, repository: IProdutoRepository): Array<Produto> {
        return repository.buscaProdutoPorCategoria(categoria);
    }

    buscaProdutoPorId(id: number, repository: IProdutoRepository): Produto {
        return repository.buscaProdutoPorCodigo(id);
    }

    registraProduto(newProduto: ProdutoDTO, repository: IProdutoRepository) {

        const produtoInserido = repository.registraProduto(newProduto);

        const novoProduto = repository.buscaProdutoPorCodigo(produtoInserido);

        const result: ProdutoOutputDTO = {
            code: 201,
            message: "Novo Produto inserido com sucesso!",
            produto: novoProduto
        }

        return result;
        
    }

    atualizaProduto(id: number, produto: ProdutoDTO, repository: IProdutoRepository): ProdutoOutputDTO {
        const produtoAtualizado = repository.atualizaProduto(id, produto);

        if (produtoAtualizado > 0) {
            const produto = repository.buscaProdutoPorCodigo(produtoAtualizado);

            const result: ProdutoOutputDTO = {
                code: 200,
                message: "Novo Produto atualizado com sucesso!",
                produto: produto
            }
    
            return result;
        } else {
            const result: ProdutoOutputDTO = {
                code: 503,
                message: "Erro Generico",
                produto: undefined
            }
            return result;
        }
    }

    deletaProduto(id: number, repository: IProdutoRepository): Produto {
        return repository.deletaProduto(id);
        
    }

}