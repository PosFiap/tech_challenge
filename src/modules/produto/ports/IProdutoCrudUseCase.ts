import { ProdutoDTO } from "../dto/ProdutoDTO";
import { ProdutoOutputDTO } from "../dto/ProdutoOutputDTO";
import { ECategoria } from "../entities/ECategoria";
import { Produto } from "../entities/Produto";
import { IProdutoRepository } from "./IProdutoRepository";

export interface IProdutoCrudUseCase {
    registraProduto(newProduto: ProdutoDTO, repository: IProdutoRepository): Promise<ProdutoOutputDTO>;
    atualizaProduto(id: number, produto: ProdutoDTO, repository: IProdutoRepository): Promise<Produto>;
    deletaProduto(id: number, repository: IProdutoRepository): Promise<Produto>;
    buscaProdutoPorId(id: number, repository: IProdutoRepository): Promise<ProdutoDTO>
    buscaProdutoPorCategoria(categoria: ECategoria, repository: IProdutoRepository): Promise<Produto[]>
}