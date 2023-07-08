
import { ProdutoDTO } from "../dto/ProdutoDTO"
import { ECategoria } from "../entities/ECategoria"
import { Produto } from "../entities/Produto"

export interface IProdutoRepository {
    deletaProduto(id: number): Produto
    buscaProdutoPorCategoria(categoria: ECategoria): Array<Produto>
    buscaProdutoPorCodigo(codigo: number): Produto

    registraProduto(produto: ProdutoDTO): number
    atualizaProduto(id: number, produto: ProdutoDTO): number

}