import { CustomError, CustomErrorType } from '../../../utils/customError'
import { EStatus } from '../../common/value-objects/EStatus'

export class AtualizaStatusPedidoDTO {
  constructor (
    readonly codigoPedido: number,
    readonly codigoStatus: number
  ) { 
    this.validaDTO()
  }

  private validaCodigoPedido (): boolean {
    if (!this.codigoPedido) return false
    if (typeof this.codigoPedido !== 'number') return false
    return true
  }

  private validaCodigoStatus (): boolean {
    if (typeof this.codigoStatus !== 'number') return false
    if (this.codigoStatus < 0 || this.codigoStatus > EStatus.__LENGTH) return false
    return true
  }

  public validaDTO (): void {
    const erros: String[] = []
    if (!this.validaCodigoPedido()) erros.push('Código de pedido inválido')
    if (!this.validaCodigoStatus()) erros.push('Código de status inválido')
    if (erros.length > 0) {
      throw new CustomError(CustomErrorType.InvalidInput, erros.join('\n'))
    }
  }
}
