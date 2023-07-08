import { ProdutoDTO } from "../dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../dto/ProdutoOutputDTO";
import { ECategoria } from "../entities/ECategoria";
import { Produto } from "../entities/Produto";
import { IProdutoRepository } from "./IProdutoRegistry";

export interface IProdutoCrudUseCase {
    registraProduto(newProduto: ProdutoDTO, repository: IProdutoRepository): ProdutoOutputDTO;
    atualizaProduto(id: number, produto: ProdutoDTO, repository: IProdutoRepository): ProdutoOutputDTO;
    deletaProduto(id: number, repository: IProdutoRepository): Produto;
    buscaProdutoPorId(id: number, repository: IProdutoRepository): Produto
    buscaProdutoPorCategoria(categoria: ECategoria, repository: IProdutoRepository): Array<Produto>
}