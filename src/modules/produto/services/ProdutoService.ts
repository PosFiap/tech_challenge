import { CustomError, CustomErrorType } from "../../../utils/customError";
import { validaCategoria } from "../../common/value-objects/ECategoria";
import { AlteraProdutoDTO, AlteraProdutoOutputDTO } from "../dto/AlteraProdutoDTO";
import { BuscarProdutoDTO, BuscarProdutoOutputDTO } from "../dto/BuscarProdutoDTO";
import { DeletaProdutoDTO, DeletaProdutoOutputDTO } from "../dto/DeletaProdutoDTO";
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

    async deletaProduto(data: DeletaProdutoDTO): Promise<DeletaProdutoOutputDTO> {
        const codigoProduto = data.codigo;

        const produto = await this.produtoRepository.deletaProduto(codigoProduto);

        if(!produto) throw new CustomError(
            CustomErrorType.RepositoryDataNotFound,
            "Produto não existe"
        )

        return new DeletaProdutoOutputDTO(
            produto.codigo!,
            produto.nome,
            produto.descricao,
            produto.valor,
            produto.categoria_codigo
        )
    }

    async buscaProduto(data: BuscarProdutoDTO): Promise<BuscarProdutoOutputDTO> {
        const codigoProduto = data.codigo;

        const produto = await this.produtoRepository.buscaProdutoPorCodigo(codigoProduto);

        return new BuscarProdutoOutputDTO(
            produto.codigo!,
            produto.nome,
            produto.descricao,
            produto.valor,
            produto.categoria_codigo
        )

    }

    async alteraProduto(data: AlteraProdutoDTO): Promise<AlteraProdutoOutputDTO> {
        const produto = new Produto(
            data.codigo,
            data.nome,
            data.descricao,
            data.valor,
            data.categoriaCodigo
        );

        const produtoEntity: IProdutoEntity = {
            categoria_codigo: produto.categoria_codigo,
            descricao: produto.descricao,
            nome: produto.nome,
            valor: produto.valor,
            codigo: produto.codigo!
        }
        
        const produtoInserido = await this.produtoRepository.alteraProduto(produtoEntity);

        return new AlteraProdutoOutputDTO(
            produtoInserido.codigo!,
            produtoInserido.nome,
            produtoInserido.descricao,
            produtoInserido.valor,
            produtoInserido.categoria_codigo
        )
    }

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
}