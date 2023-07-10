import { ECategoria } from '../../common/value-objects/ECategoria'

export interface IProdutoEntity {
  codigo?: number
  nome: string
  descricao: string
  valor: number
  categoria_codigo: ECategoria
}
