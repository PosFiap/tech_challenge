import { AlteraProdutoOutputDTO } from "../../modules/produto/dto/AlteraProdutoDTO";
import { BuscarProdutoOutputDTO } from "../../modules/produto/dto/BuscarProdutoDTO";
import { DeletaProdutoOutputDTO } from "../../modules/produto/dto/DeletaProdutoDTO";
import { ListaProdutoCategoriaOutputDTO } from "../../modules/produto/dto/ListaProdutoCategoriaDTO";
import { RegistraProdutoOutputDTO } from "../../modules/produto/dto/RegistraProdutoDTO";
import { IProdutoService } from "../../modules/produto/ports/IProdutoService";

export interface IProdutoController {
    produtoService: IProdutoService;

    deletaProduto(data: {
        codigoProduto: number
    }): Promise<DeletaProdutoOutputDTO>
    
    registraProduto(data: {
        nome: string,
        descricao: string,
        valor: number,
        categoria_codigo: number
    }): Promise<RegistraProdutoOutputDTO>

    alteraProduto(data: {
        codigo: number,
        nome: string,
        descricao: string,
        valor: number,
        categoria_codigo: number
    }): Promise<AlteraProdutoOutputDTO>

    listaProdutoPorCategoria(data: {
        codigoCategoria: number
    }): Promise<ListaProdutoCategoriaOutputDTO>

    buscaProdutoPorCodigo(data: {
        codigoProduto: number
    }): Promise<BuscarProdutoOutputDTO>
}