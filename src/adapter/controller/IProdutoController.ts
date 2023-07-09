import { ListaProdutoCategoriaOutputDTO } from "../../modules/produto/dto/ListaProdutoCategoriaDTO";
import { RegistraProdutoOutputDTO } from "../../modules/produto/dto/RegistraProdutoDTO";
import { IProdutoService } from "../../modules/produto/ports/IProdutoService";

export interface IProdutoController {
    produtoService: IProdutoService;

    registraProduto(data: {
        nome: string,
        descricao: string,
        valor: number,
        categoria_codigo: number
    }): Promise<RegistraProdutoOutputDTO>

    listaProdutoPorCategoria(data: {
        codigoCategoria: number
    }): Promise<ListaProdutoCategoriaOutputDTO>
}