import { IProdutoRepository } from '../../modules/produto/ports/IProdutoRepository'
import { PrismaClient } from '@prisma/client'
import { IProdutoEntity } from '../../modules/produto/entity/IProdutoEntity'
import { CustomError, CustomErrorType } from '../../utils/customError'
import { ECategoria } from '../../modules/common/value-objects/ECategoria'

export class PrismaProdutoRepository implements IProdutoRepository {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async alteraProduto (produto: IProdutoEntity): Promise<IProdutoEntity> {
    const existeProduto = !!(await this.prisma.produto.findUnique({
      where: {
        codigo: produto.codigo
      }
    }))

    if (!existeProduto) {
      throw new CustomError(
        CustomErrorType.RepositoryDataNotFound,
        'O produto não existe'
      )
    }

    const produtoAtualizado = await this.prisma.produto.update({
      data: {
        nome: produto.nome,
        descricao: produto.descricao,
        valor: produto.valor,
        categoria_codigo: produto.categoria_codigo
      },
      where: {
        codigo: produto.codigo!
      }
    })

    return produtoAtualizado
  }

  async buscaProdutoPorCategoria (categoriaCodigo: ECategoria): Promise<IProdutoEntity[]> {
    const produtos = this.prisma.produto.findMany({
      where: {
        categoria_codigo: categoriaCodigo
      }
    })

    return produtos
  }

  async registraProduto (produto: IProdutoEntity): Promise<IProdutoEntity> {
    const produtoJaExiste = (await this.prisma.produto.count({
      where: {
        nome: produto.nome
      }
    })) > 0

    if (produtoJaExiste) {
      throw new CustomError(
        CustomErrorType.DuplicatedItem,
        'Um produto cadastrado com esse nome já existe'
      )
    }

    const produtoInserido = await this.prisma.produto.create({
      data: produto
    })

    return produtoInserido
  }
  /*
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
*/
}
