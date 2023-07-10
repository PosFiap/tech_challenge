import { CustomError, CustomErrorType } from '../../../utils/customError'
import { CPF as CPFVO } from '../../common/value-objects/CPF'

export class InserePedidoDTO {
  private readonly _CPF: CPFVO | null
  constructor (
    CPF: string | null,
    readonly produtosPedidoCodigo: Array<{ codigo: number }>
  ) {
    this._CPF = CPF ? new CPFVO(CPF) : null
    this.validaDTO()
  }

  public get CPF (): string | null {
    return this._CPF?.valor ?? null
  }

  private validaItemDePedido (): boolean {
    if (!this.produtosPedidoCodigo) return false
    if (this.produtosPedidoCodigo.length === 0) return false
    if (this.produtosPedidoCodigo.some((item) => {
      return typeof item.codigo !== 'number' || item.codigo <= 0
    })) return false
    return true
  }

  public validaDTO (): void {
    const erros: String[] = []
    if (!this.validaItemDePedido()) erros.push('Um ou mais itens do pedido é inválido')
    if (erros.length > 0) {
      throw new CustomError(CustomErrorType.InvalidInput, erros.join('\n'))
    }
  }
}
