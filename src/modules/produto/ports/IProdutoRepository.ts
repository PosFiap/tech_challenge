export interface IProdutoRepository {
    buscaProdutoPorCodigo(codigo: number): Promise<any>
}