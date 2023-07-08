import { IProdutoRegistry } from '../../modules/produto/ports/IProdutoRegistry'

interface Data {
  codigo: number
  nome: string
  descricao: string
  valor: number
  categoria_codigo: number
}

const bancoDeDados: Data[] = [{
  codigo: 0,
  nome: 'x-salsicha',
  descricao: '',
  valor: 12.90,
  categoria_codigo: 0
}, {
  codigo: 1,
  nome: 'sorvete de pistache',
  descricao: '',
  valor: 5.10,
  categoria_codigo: 1
}]

export class ProdutoRepository implements IProdutoRegistry {
  async buscaProdutoPorCodigo (codigo: number): Promise<Data> {
    return bancoDeDados[codigo]
  }
}
