import { CustomError, CustomErrorType } from '../../../utils/customError'
import { EStatus } from '../../common/value-objects/EStatus'
import { Produto } from './Produto'

export class Pedido {
  constructor (
    readonly CPF: string | null,
    private _status: EStatus,
    readonly produtosPedido: Produto[],
    readonly codigo: number | null
  ) {}

  get status (): EStatus {
    return this._status
  }

  atualizaStatus (novoStatus: EStatus): void {
    if (novoStatus <= this._status) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'O status indicado não é válido para esse pedido')
    }
    this._status = novoStatus
  }
}
