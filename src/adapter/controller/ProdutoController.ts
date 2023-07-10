import { AlteraProdutoDTO, AlteraProdutoOutputDTO } from "../../modules/produto/dto/AlteraProdutoDTO";
import { BuscarProdutoDTO, BuscarProdutoOutputDTO } from "../../modules/produto/dto/BuscarProdutoDTO";
import { DeletaProdutoDTO, DeletaProdutoOutputDTO } from "../../modules/produto/dto/DeletaProdutoDTO";
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

    async deletaProduto(data: { codigoProduto: number; }): Promise<DeletaProdutoOutputDTO> {
        const inputDTO = new DeletaProdutoDTO(data.codigoProduto);
        const produto = await this.produtoService.deletaProduto(inputDTO);
        return produto;
    }

    async buscaProdutoPorCodigo(data: { codigoProduto: number; }): Promise<BuscarProdutoOutputDTO> {
        const inputDTO = new BuscarProdutoDTO(data.codigoProduto);
        const produto = await this.produtoService.buscaProduto(inputDTO);
        return produto;
    }

    async alteraProduto(data: { codigo: number; nome: string; descricao: string; valor: number; categoria_codigo: number; }): Promise<AlteraProdutoOutputDTO> {
        const inputDTO = new AlteraProdutoDTO(
            data.codigo,
            data.nome,
            data.descricao,
            data.valor,
            data.categoria_codigo
        )
        const pedidoAlterado = await this.produtoService.alteraProduto(inputDTO);

        return pedidoAlterado;
    }

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