import { ECategoria } from '../../common/value-objects/ECategoria'

export class Produto {
  constructor (
    readonly codigo: string,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly categoria_codigo: ECategoria
  ) {}
}
