export interface IProdutoRegistry {
  buscaProdutoPorCodigo(codigo: number): Promise<any>
}
