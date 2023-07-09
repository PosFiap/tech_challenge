export class ItemListaPedidoOutputDTO {
  constructor (
    readonly status: string,
    readonly codigo: number,
    readonly CPF: string | null,
    readonly produtosPedido: ItemPedidoListaPedidoOutputDTO[]
  ) {}

  get valorTotal (): string {
    const valorTotal = this.produtosPedido.reduce((valorSoma, item) => item.valor + valorSoma, 0)
    return valorTotal.toFixed(2)
  }

  get quantidadeProdutosPedido (): number {
    return this.produtosPedido.length
  }
}

export class ItemPedidoListaPedidoOutputDTO {
  constructor (
    readonly nome: string,
    readonly valor: number,
    readonly categoria: string
  ) {}
}
