import { IProdutoRepository } from "../../modules/produto/ports/IProdutoRepository";
import { ProdutoDTO } from "../../modules/produto/dto/ProdutoDTO";
import { ECategoria } from "../../modules/produto/entities/ECategoria";
import { EErrorRepository } from "../../modules/produto/entities/EErrorRepository";
import { Produto } from "../../modules/produto/entities/Produto";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { PrismaClient } from "@prisma/client";

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
    
    constructor(private prisma: PrismaClient){

    }

    async registraProduto(produto: ProdutoDTO): Promise<Produto> {

        const product = await this.prisma.produto.create({
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                categoria_codigo: produto.categoria_codigo,
                valor: produto.valor
            }
        });


        return new Produto(product.codigo, produto.nome, produto.descricao, produto.valor, produto.categoria_codigo);
    }



    async atualizaProduto(id: number, produto: ProdutoDTO): Promise<Produto> {
        
        const produtoParaComparar = await this.buscaProdutoPorCodigo(id);

        if (this.compareProducts(produto, produtoParaComparar)) {
            throw new CustomError(CustomErrorType.DuplicatedItem, "Mesmos Valores Inseridos, por favor tente novamente.");
        }

        const product = await this.prisma.produto.update({
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categoria_codigo: produto.categoria_codigo
            },
            where: {
                codigo : id!
            }
        })
        
        return product;
       
    }

    async buscaProdutoPorCodigo(codigo: number):  Promise<Produto> {

        const produto = await this.prisma.produto.findUnique({
            where: {
                codigo: codigo
            }
        });

        if (produto) {
            return new Produto(produto.codigo, produto.nome, produto.descricao, produto.valor, produto.categoria_codigo);
        } else {
            throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Dados não encontrados, tente novamente");
        }

        
    }

    async buscaProdutoPorCategoria(categoria: ECategoria): Promise<Produto[]> {

        const produto = await this.prisma.produto.findMany({
            where: {
                categoria_codigo: categoria
            }
        });
        
        return produto;
    }

    async deletaProduto(id: number): Promise<Produto> {

        const existe = this.buscaProdutoPorCodigo(id);

        if (!existe) {
            throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Dados não encontrados, tente novamente");
        }

        const deletado = await this.prisma.produto.delete({
            where: {codigo: id!}
        })

        return deletado;


    }

    compareProducts(a: ProdutoDTO, b: Produto) {
        return a.nome === b.nome && a.descricao === b.descricao && a.categoria_codigo === b.categoria_codigo && a.valor === b.valor;

    }

}