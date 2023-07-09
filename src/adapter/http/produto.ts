import { Router } from "express";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";
import { IProdutoController } from "../controller/IProdutoController";

export class ProdutoHTTP {
    private router: Router;

    constructor(
        private readonly produtoController: IProdutoController
    ){
        this.router = Router();
        this.setRoutes();
    };

    private setRoutes() {

        this.router.post('/', async (req, res) => {
        
            try{
                const produto = req.body;
                const resultado = await this.produtoController.registraProduto(produto);
                res.status(201).send(resultado);
            } catch (err) {
                if( err instanceof CustomError) {
                    customErrorToResponse(err, res);
                    return;
                }
                res.status(500).json({
                    mensagem: 'Falha ao registrar o cliente'
                });
              }
        });

        /*
        this.router.get('/:id', async (req, res) => {
            const produtoId = req.params.id;
            const resultado = await this.produtoController.buscaProdutoPorId(+produtoId);
        
            let statusCode = 200;
            if (resultado instanceof GenericOutputErrorDTO) statusCode = 404;
        
            res.status(statusCode).json(resultado);
        
        });
        
        this.router.get('/', async (req, res) => {
            const tipoCategoria = req.query.categoria as string;
            const resultado = await this.produtoController.buscaProdutoPorCategoria(+tipoCategoria);
        
            let statusCode = 200;
            if (resultado.length < 1) statusCode = 404;
            
            res.status(statusCode).json(resultado);
        });
        
        this.router.put('/:id', async(req, res) => {
        
            const idProduto = req.params.id;
            const produto = req.body;
            const resultado = await this.produtoController.atualizaProduto(+idProduto, produto);
        
            let statusCode = 200;
            if (resultado instanceof GenericOutputErrorDTO) {
                if (resultado.code === 4) {
                    statusCode = 304;
                } else {
                    statusCode = 500;
                }
                
            }
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
        });*/
    }

    getRouter() {
        return this.router;
    }
}