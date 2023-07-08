import { Produto } from "../../pedido/model/Produto";

export interface IProdutoRepository {
    buscaProdutoPorCodigo(codigo: number): Promise<Produto>
}