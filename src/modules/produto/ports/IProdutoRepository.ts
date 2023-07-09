
import { ProdutoDTO } from "../dto/ProdutoDTO"
import { ECategoria } from "../entities/ECategoria"
import { Produto } from "../entities/Produto"

export interface IProdutoRepository {
    deletaProduto(id: number): Promise<Produto>
    buscaProdutoPorCategoria(categoria: ECategoria): Promise<Produto[]>
    buscaProdutoPorCodigo(codigo: number): Promise<Produto>

    registraProduto(produto: ProdutoDTO): Promise<Produto>
    atualizaProduto(id: number, produto: ProdutoDTO): Promise<Produto>

}