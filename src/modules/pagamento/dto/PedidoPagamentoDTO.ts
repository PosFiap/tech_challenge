import { EStatus } from "../../common/value-objects/EStatus"

interface ItemDePedido {
  codigo: number
  nome: string
  descricao: string
  valor: number
  categoria_codigo: number
}

export interface PedidoPagamentoDTO {
  codigo: number
  status: EStatus
  itensDePedido: ItemDePedido[]
}
