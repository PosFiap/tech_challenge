import { CustomError, CustomErrorType } from '../../../utils/customError'

export enum ECategoria {
  'Lanche',
  'Sobremesa',
  'Bebida',
  'Acompanhamento'
}

export function validaCategoria (codigoCategoria: number): void {
  if (ECategoria[codigoCategoria] === undefined) {
    throw new CustomError(
      CustomErrorType.BusinessRuleViolation,
      'Código de categoria inválido'
    )
  }
}
