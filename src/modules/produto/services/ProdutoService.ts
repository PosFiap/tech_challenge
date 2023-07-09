import { ProdutoDTO } from "../dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../dto/ProdutoOutputDTO";
import { RegistraProdutoDTO, RegistraProdutoOutputDTO } from "../dto/RegistraProdutoDTO";
import { IProdutoEntity } from "../entity/IProdutoEntity";
import { ECategoria } from "../model/ECategoria";
import { Produto } from "../model/Produto";
import { IProdutoCrudUseCase } from "../ports/IProdutoCrudUseCase";
import { IProdutoRepository } from "../ports/IProdutoRepository";
import { IProdutoService } from "../ports/IProdutoService";

export class ProdutoService implements IProdutoService {

    constructor(
        readonly produtoRepository: IProdutoRepository
    ){}

    async registraProduto(data: RegistraProdutoDTO): Promise<RegistraProdutoOutputDTO> {

        const produto = new Produto(
            null,
            data.nome,
            data.descricao,
            data.valor,
            data.categoria_codigo
        );

        const produtoEntity: IProdutoEntity = {
            categoria_codigo: produto.categoria_codigo,
            descricao: produto.descricao,
            nome: produto.nome,
            valor: produto.valor
        }
        
        const produtoInserido = await this.produtoRepository.registraProduto(produtoEntity);

        return new RegistraProdutoOutputDTO(
            produtoInserido.codigo!,
            produtoInserido.nome,
            produtoInserido.descricao,
            produtoInserido.valor,
            produtoInserido.categoria_codigo
        )
    }

    /*
    async buscaProdutoPorCategoria(categoria: ECategoria, repository: IProdutoRepository): Promise<Produto[]> {
        return await repository.buscaProdutoPorCategoria(categoria);
    }

    async buscaProdutoPorId(id: number, repository: IProdutoRepository): Promise<ProdutoDTO> {

        const produto = await repository.buscaProdutoPorCodigo(id);

        return produto;
    }

    

    async atualizaProduto(id: number, produto: ProdutoDTO, repository: IProdutoRepository): Promise<Produto> {
        const produtoAtualizado = await repository.atualizaProduto(id, produto);

        return produtoAtualizado;        
    }

    async deletaProduto(id: number, repository: IProdutoRepository): Promise<Produto> {
        return await repository.deletaProduto(id);
        
    }*/

}