import { Router } from "express";
import { ProdutoAdapter } from "../../adapter/controller/ProdutoAdapter";
import { ProdutoService } from "../../modules/produto/services/ProdutoService";
import { ProdutoRepository } from "../../adapter/persistence/ProdutoRepository";
import { ECategoria } from "../../modules/produto/entities/ECategoria";
import { GenericOutputErrorDTO } from "../../utils/dto/GenericOutputDTO";
import { PrismaClient } from "@prisma/client";


const router: Router = Router();

const adapter = new ProdutoAdapter(new ProdutoService(), new ProdutoRepository(new PrismaClient()));


router.get('/:id', (req, res) => {


    const produtoId = req.params.id;

    const resultado = adapter.buscaProdutoPorId(+produtoId);

    res.status(200).json(resultado);

});

router.get('/', (req, res) => {

    const tipoCategoria = req.query.categoria as string;


    const resultado = adapter.buscaProdutoPorCategoria(+tipoCategoria);

    res.status(200).json(resultado);
});

router.post('/', async (req, res) => {

    const produto = req.body;


    const resultado = await adapter.registraProduto(produto);

    res.status(201).send(resultado);
});

router.put('/:id', (req, res) => {

    const idProduto = req.params.id;
    const produto = req.body;

    const resultado = adapter.atualizaProduto(+idProduto, produto);

    let statusCode = 200;

    if (resultado instanceof GenericOutputErrorDTO) {
        statusCode = 500;
    }

    res.status(statusCode).json(resultado);
});

router.delete('/:id', (req, res) => {

    const idProduto = req.params.id;

    const resultado = adapter.deletaProduto(+idProduto);

    res.status(200).json(resultado);
});


export {router};
