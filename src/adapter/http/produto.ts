import { Router } from 'express'
import { CustomError } from '../../utils/customError'
import { customErrorToResponse } from './error-parser'
import { IProdutoController } from '../controller/IProdutoController'

export class ProdutoHTTP {
  private readonly router: Router

  constructor (
    private readonly produtoController: IProdutoController
  ) {
    this.router = Router()
    this.setRoutes()
  };

  private setRoutes (): void {
    this.router.post('/', async (req, res) => {
      try {
        const produto = req.body
        const resultado = await this.produtoController.registraProduto(produto)
        res.status(201).send(resultado)
      } catch (err) {
        console.error(err)

        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }
        res.status(500).json({
          mensagem: 'Falha ao registrar o produto'
        })
      }
    })

    this.router.get('/', async (req, res) => {
      try {
        const codigoCategoria = parseInt(req.query.codigo_categoria as string, 10)
        const produtos = await this.produtoController.listaProdutoPorCategoria({
          codigoCategoria
        })
        res.status(200).send(produtos)
      } catch (err) {
        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }
        res.status(500).json({
          mensagem: 'Falha ao buscar os produtos'
        })
      }
    })

    this.router.put('/:id', async (req, res) => {
      try {
        const codigoProduto = parseInt(req.params.id, 10)
        const produto = req.body
        const resultado = await this.produtoController.alteraProduto(
          {
            categoria_codigo: produto.categoria_codigo,
            codigo: codigoProduto,
            descricao: produto.descricao,
            nome: produto.nome,
            valor: produto.valor
          }
        )
        res.status(200).send(resultado)
      } catch (err) {
        if (err instanceof CustomError) {
          customErrorToResponse(err, res)
          return
        }
        res.status(500).json({
          mensagem: 'Falha ao alterar o produto'
        })
      }
    })

    /*
        this.router.get('/:id', async (req, res) => {
            const produtoId = req.params.id;
            const resultado = await this.produtoController.buscaProdutoPorId(+produtoId);

            let statusCode = 200;
            if (resultado instanceof GenericOutputErrorDTO) statusCode = 404;

            res.status(statusCode).json(resultado);

        });

        this.router.delete('/:id', async(req, res) => {

            const idProduto = req.params.id;

            const resultado = await this.produtoController.deletaProduto(+idProduto);

            let statusCode = 200;
            if (resultado instanceof GenericOutputErrorDTO) {
                    statusCode = 500;
            }
            res.status(statusCode).json(resultado);
        }); */
  }

  getRouter (): Router {
    return this.router
  }
}
