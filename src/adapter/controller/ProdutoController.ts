import { ListaProdutoCategoriaDTO, ListaProdutoCategoriaOutputDTO } from "../../modules/produto/dto/ListaProdutoCategoriaDTO";
import { RegistraProdutoDTO, RegistraProdutoOutputDTO } from "../../modules/produto/dto/RegistraProdutoDTO";
import { IProdutoService } from "../../modules/produto/ports/IProdutoService";
import { ProdutoService } from "../../modules/produto/services/ProdutoService";
import { PrismaProdutoRepository } from "../persistence/ProdutoRepository";
import { IProdutoController } from "./IProdutoController";

export class ProdutoController implements IProdutoController {

    private constructor(
        readonly produtoService: IProdutoService
    ) {}

    async registraProduto(data: { nome: string; descricao: string; valor: number; categoria_codigo: number; }): Promise<RegistraProdutoOutputDTO> {
        const inputDTO = new RegistraProdutoDTO(
            data.nome,
            data.descricao,
            data.valor,
            data.categoria_codigo
        )
        const pedidoInserido = await this.produtoService.registraProduto(inputDTO);

        return pedidoInserido;
    }

    async listaProdutoPorCategoria(data: {
        codigoCategoria: number
    }): Promise<ListaProdutoCategoriaOutputDTO> {
        const inputDTO = new ListaProdutoCategoriaDTO( data.codigoCategoria );
        const listaProdutos = await this.produtoService.buscaProdutoPorCategoria(inputDTO);
        return listaProdutos;
    }


    static create(configuration:string = 'default'): ProdutoController {
        if(configuration === 'default') {
            const repository = new PrismaProdutoRepository();
            const service = new ProdutoService(repository);
            return new ProdutoController(service);
        }
        throw new Error('Invalid Configuration Setup');
    }
}