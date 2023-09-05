import { EStatus } from '../../common/value-objects'
import { CPF as CPFVO } from '../../common/value-objects/CPF'

export class ItemListaPedidoAndamentoOutputDTO {
  private readonly _CPF: CPFVO | null

  constructor (
    readonly status: EStatus,
    readonly codigo: number,
    CPF: string | null,
    readonly dataPedido: Date,
    readonly produtosPedido: ItemProdutoListaPedidoAndamentoOutputDTO[]
  ) {
    this._CPF = CPF ? new CPFVO(CPF) : null
  }

  get valorTotal (): string {
    const valorTotal = this.produtosPedido.reduce((valorSoma, item) => item.valor + valorSoma, 0)
    return valorTotal.toFixed(2)
  }

  get CPF (): string | null {
    return this._CPF?.valor ?? null
  }

  get quantidadeProdutosPedido (): number {
    return this.produtosPedido.length
  }
}

export class ItemProdutoListaPedidoAndamentoOutputDTO {
  constructor (
    readonly nome: string,
    readonly valor: number,
    readonly categoria: string
  ) {}
}
