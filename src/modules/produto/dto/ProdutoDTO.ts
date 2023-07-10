import { CustomError, CustomErrorType } from '../../../utils'
import { ECategoria } from '../../common/value-objects/ECategoria'

export class ProdutoDTO {
  constructor (
    public nome: string,
    public descricao: string,
    public valor: number,
    public categoria_codigo: ECategoria
  ) {}

  validaCodigoCategoria (): void {
    if (this.categoria_codigo === null || isNaN(this.categoria_codigo)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Código de categoria inválido')
    }
  }
}
