import { IProdutoRepository } from "../../modules/produto/ports/IProdutoRepository";

const bancoDeDados = [{
    codigo: 0,
    nome: 'x-salsicha',
    descricao: '',
    valor: 12.90,
    categoria_codigo: 0,
},{
    codigo: 1,
    nome: 'sorvete de pistache',
    descricao: '',
    valor: 5.10,
    categoria_codigo: 1,
}];

export class ProdutoRepository implements IProdutoRepository {
    async buscaProdutoPorCodigo(codigo: number) {
        return bancoDeDados[codigo];
    }

}