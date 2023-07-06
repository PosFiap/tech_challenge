import { Router } from "express";
import { ProdutoAdapter } from "../../adapter/controller/ProdutoAdapter";
import { ProdutoService } from "../../modules/produto/services/ProdutoService";
import { ProdutoRepository } from "../../adapter/persistence/ProdutoRepository";
import { ECategoria } from "../../modules/produto/entities/ECategoria";


const router: Router = Router();

const adapter = new ProdutoAdapter(new ProdutoService(), new ProdutoRepository());


router.get('/:id', (req, res) => {


    const produtoId = req.params.id;

    const resultado = adapter.buscaProdutoPorId(+produtoId);

    res.json(resultado).status(200);

});

router.get('/', (req, res) => {

    const tipoCategoria = req.query.categoria as string;


    const resultado = adapter.buscaProdutoPorCategoria(+tipoCategoria);

    res.json(resultado).status(200);
});

router.post('/', (req, res) => {

    const produto = req.body;


    const resultado = adapter.registraProduto(produto);

    res.send(resultado).status(201);
});

router.put('/:id', (req, res) => {

    const idProduto = req.params.id;
    const produto = req.body;


    const resultado = adapter.atualizaProduto(+idProduto, produto);

    res.json(resultado).status(200);
});

router.delete('/:id', (req, res) => {

    const idProduto = req.params.id;

    const resultado = adapter.deletaProduto(+idProduto);

    res.json(resultado).status(200);
});


export {router};
