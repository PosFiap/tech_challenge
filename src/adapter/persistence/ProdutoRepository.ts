import { ProdutoDTO } from "../../modules/produto/dto/ProdutoDTO";
import { ECategoria } from "../../modules/produto/entities/ECategoria";
import { EErrorRepository } from "../../modules/produto/entities/EErrorRepository";
import { Produto } from "../../modules/produto/entities/Produto";
import { IProdutoRepository } from "../../modules/produto/ports/IProdutoRegistry";

const bancoDeDados: Array<Produto> = [{
    codigo: 0,
    nome: 'x-salsicha',
    descricao: '',
    valor: 12.90,
    categoria_codigo: ECategoria.Lanche,
},
{
    codigo: 1,
    nome: 'x-picanha',
    descricao: '',
    valor: 32.99,
    categoria_codigo: ECategoria.Lanche,
},
{
    codigo: 2,
    nome: 'sorvete de pistache',
    descricao: '',
    valor: 5.10,
    categoria_codigo: ECategoria.Sobremesa,
}];


export class ProdutoRepository implements IProdutoRepository {
    

    
    registraProduto(produto: ProdutoDTO): number {

        const temporaryProduct = new Produto(
            bancoDeDados.length + 1, 
            produto.nome, 
            produto.descricao, 
            produto.valor, 
            produto.categoria_codigo)

        return bancoDeDados.push(temporaryProduct);
    }

    atualizaProduto(id: number, produto: ProdutoDTO): number {

        const buscaDoId = bancoDeDados[id];

        if (buscaDoId) {
            if (buscaDoId !== produto) {
                const temporaryProduct = new Produto(
                    bancoDeDados.length + 1, 
                    produto.nome, 
                    produto.descricao, 
                    produto.valor, 
                    produto.categoria_codigo)
                    bancoDeDados.splice(id, 1, temporaryProduct);
                return id;
            } else {
                return EErrorRepository.MesmosValores;
            }
        } else {
            return EErrorRepository.NadaEncontrado;
        }

       
    }

    buscaProdutoPorCodigo(codigo: number): Produto {

        return bancoDeDados[codigo];
    }

    buscaProdutoPorCategoria(categoria: ECategoria): Array<Produto> {

        let buscaFeita: Array<Produto> = [];

        bancoDeDados.forEach(elemento => {
            if (elemento.categoria_codigo == categoria) {
                buscaFeita.push(elemento);
            }
        });
        
        return buscaFeita;
    }

    deletaProduto(id: number): Produto {

        const deletado = bancoDeDados.splice(id, 1);
        return deletado[0];


    }

}