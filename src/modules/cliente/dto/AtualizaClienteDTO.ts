
import { CustomError, CustomErrorType } from '../../../utils/customError'
import { CommonDTO } from '../../common/dto/CommonDTO'
import { CPF as CPFVO } from '../../common/value-objects/CPF'

export class AtualizaClienteDTO extends CommonDTO {
  private readonly _CPF: CPFVO
  constructor (
    CPF: string,
    readonly email: string,
    readonly nome: string
  ) {
    super()
    this._CPF = new CPFVO(CPF)
    this.validaDTO()
  }

  public get CPF (): string {
    return this._CPF.valor
  }

  protected validaDTO (): void {
    if (!this.email || !this.nome) {
      throw new CustomError(CustomErrorType.InvalidInput, 'E-mail ou nome devem ser preenchidos')
    }
  }
}

export class AtualizaClienteOutputDTO {
  private readonly _CPF: CPFVO
  constructor (
    CPF: string,
    readonly email: string,
    readonly nome: string
  ) {
    this._CPF = new CPFVO(CPF)
  }

  public get CPF (): string {
    return this._CPF.valor
  }

    public toJSON = () : any => {
        return {
            CPF: this.CPF,
            nome: this.nome,
            email: this.email
        };
  }
}
