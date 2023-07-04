import { IProdutoRegistry } from "../../modules/produto/ports/IProdutoRegistry";

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

export class ProdutoRepository implements IProdutoRegistry {
    buscaProdutoPorCodigo(codigo: number) {
        return bancoDeDados[codigo];
    }

}