import { CustomError, CustomErrorType } from '../../../utils/customError'
import { ECategoria } from '../../common/value-objects/ECategoria'

export class Produto {
  constructor (
    readonly codigo: number | null,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly categoria_codigo: ECategoria
  ) {
    this.validaValor()
    this.validaCategoriaCodigo()
    this.validaNome()
    this.validaDescricao()
  }

  private validaNome (): void {
    if (!this.nome) {
      throw new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'Nome inválido'
      )
    }
  }

  private validaDescricao (): void {
    if (!this.descricao) {
      throw new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'Descrição inválida'
      )
    }
  }

  private validaCategoriaCodigo (): void {
    if (this.categoria_codigo == null || !ECategoria[this.categoria_codigo]) {
      throw new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'Código de categoria inválida'
      )
    }
  }

  private validaValor (): void {
    if (this.valor < 0) {
      throw new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'Um produto não pode conter um valor negativo'
      )
    }
  }
}
