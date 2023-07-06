import { EStatus } from './EStatus'
import { ItemDePedido } from './ItemDePedido'

export class Pedido {
  public codigo: number | undefined
  constructor (
    readonly CPF: string,
    readonly status: EStatus,
    readonly itensDePedido: ItemDePedido[]
  ) {}
}
