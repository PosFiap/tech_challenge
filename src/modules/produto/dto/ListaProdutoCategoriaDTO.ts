import { CustomError, CustomErrorType } from '../../../utils/customError'
import { ECategoria } from '../../common/value-objects/ECategoria'

export class ListaProdutoCategoriaDTO {
  constructor (
    readonly codigoCategoria: number
  ) {
    this.validaCodigoCategoria()
  }

  validaCodigoCategoria (): void {
    if (this.codigoCategoria == null || isNaN(this.codigoCategoria)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Código de categoria inválido')
    }
  }
}

export class ItemListaProdutoCategoriaDTO {
  constructor (
    readonly codigo: number,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly categoria_codigo: ECategoria
  ) {}
}

export class ListaProdutoCategoriaOutputDTO {
  constructor (
    readonly itemListaProdutoCategoria: ItemListaProdutoCategoriaDTO[]
  ) {}

  toJSON (): Record<string, any> {
    return {
      quantidade: this.itemListaProdutoCategoria.length,
      produtos: this.itemListaProdutoCategoria.map((produto) => {
        return {
          codigo: produto.codigo,
          nome: produto.nome,
          descricao: produto.descricao,
          valor: produto.valor,
          categoria_codigo: produto.categoria_codigo,
          categoria: ECategoria[produto.categoria_codigo]
        }
      })
    }
  }
}
