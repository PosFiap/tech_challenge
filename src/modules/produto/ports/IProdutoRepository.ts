import { ECategoria } from "../../common/value-objects/ECategoria"
import { IProdutoEntity } from "../entity/IProdutoEntity"

export interface IProdutoRepository {
    // deletaProduto(id: number): Promise<Produto>
    buscaProdutoPorCategoria(categoriaCodigo: ECategoria): Promise<IProdutoEntity[]>
    buscaProdutoPorCodigo(codigo: number): Promise<IProdutoEntity>
    registraProduto(produto: IProdutoEntity): Promise<IProdutoEntity>
    alteraProduto(produto: IProdutoEntity): Promise<IProdutoEntity>

}