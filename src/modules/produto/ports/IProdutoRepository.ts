import { IProdutoEntity } from "../entity/IProdutoEntity"

export interface IProdutoRepository {
    // deletaProduto(id: number): Promise<Produto>
    // buscaProdutoPorCategoria(categoria: ECategoria): Promise<Produto[]>
    // buscaProdutoPorCodigo(codigo: number): Promise<Produto>
    registraProduto(produto: IProdutoEntity): Promise<IProdutoEntity>
    // atualizaProduto(id: number, produto: ProdutoDTO): Promise<Produto>

}