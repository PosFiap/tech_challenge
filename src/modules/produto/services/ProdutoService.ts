import { validaCategoria } from "../../common/value-objects/ECategoria";
import { ItemListaProdutoCategoriaDTO, ListaProdutoCategoriaDTO, ListaProdutoCategoriaOutputDTO } from "../dto/ListaProdutoCategoriaDTO";
import { RegistraProdutoDTO, RegistraProdutoOutputDTO } from "../dto/RegistraProdutoDTO";
import { IProdutoEntity } from "../entity/IProdutoEntity";
import { Produto } from "../model/Produto";
import { IProdutoRepository } from "../ports/IProdutoRepository";
import { IProdutoService } from "../ports/IProdutoService";

export class ProdutoService implements IProdutoService {

    constructor(
        readonly produtoRepository: IProdutoRepository
    ){}

    async buscaProdutoPorCategoria(data: ListaProdutoCategoriaDTO): Promise<ListaProdutoCategoriaOutputDTO> {
        const { codigoCategoria } = data;
        validaCategoria(codigoCategoria);
        const produtos = await this.produtoRepository.buscaProdutoPorCategoria(codigoCategoria);
        return new ListaProdutoCategoriaOutputDTO(
            produtos.map((produto) => {
                return new ItemListaProdutoCategoriaDTO(
                    produto.codigo!,
                    produto.nome,
                    produto.descricao,
                    produto.valor,
                    produto.categoria_codigo
                )
            })
        );
    }

    async registraProduto(data: RegistraProdutoDTO): Promise<RegistraProdutoOutputDTO> {

        const produto = new Produto(
            null,
            data.nome,
            data.descricao,
            data.valor,
            data.categoriaCodigo
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