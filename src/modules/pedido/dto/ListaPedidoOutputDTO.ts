export class ItemListaPedidoOutputDTO {
  constructor (
    readonly status: string,
    readonly codigo: number,
    readonly CPF: string | null,
    readonly itensPedido: ItemPedidoListaPedidoOutputDTO[]
  ) {}

  get valorTotal (): string {
    const valorTotal = this.itensPedido.reduce((valorSoma, item) => item.valor + valorSoma, 0)
    return valorTotal.toFixed(2)
  }

  get quantidadeItensPedido (): number {
    return this.itensPedido.length
  }
}

export class ItemPedidoListaPedidoOutputDTO {
  constructor (
    readonly nome: string,
    readonly valor: number,
    readonly categoria: string
  ) {}
}

