import { ECategoria } from './ECategoria'

export class ItemDePedido {
  constructor (
    readonly codigo: number,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly categoria_codigo: ECategoria
  ) {}
}
