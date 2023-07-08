import { EStatus } from '../value-objects/EStatus'

export class AtualizaStatusPedidoDTO {
  constructor (
    readonly codigoPedido: number,
    readonly codigoStatus: number
  ) {}

  private validaCodigoPedido (): boolean {
    if (!this.codigoPedido) return false
    if (typeof this.codigoPedido !== 'number') return false
    if (this.codigoPedido < 1000) return false
    return true
  }

  private validaCodigoStatus (): boolean {
    if (typeof this.codigoStatus !== 'number') return false
    if (this.codigoStatus < 0 || this.codigoStatus > EStatus.__LENGTH) return false
    return true
  }

  public validaDTO (): String[] {
    const erros: String[] = []
    if (!this.validaCodigoPedido()) erros.push('Código de pedido inválido')
    if (!this.validaCodigoStatus()) erros.push('Código de status inválido')
    return erros
  }
}

