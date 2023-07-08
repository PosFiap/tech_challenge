import { ECategoria } from '../value-objects/ECategoria'

export class ItemDePedido {
  constructor (
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly categoria_codigo: ECategoria
  ) {}
}
