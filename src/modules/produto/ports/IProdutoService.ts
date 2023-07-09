import { IAlteraProdutoUseCase } from "./IAlteraProdutoUseCase";
import { IBuscaProdutoUseCase } from "./IBuscaProdutoUseCase";
import { IListaProdutoPorCategoriaUseCase } from "./IListaProdutoPorCategoriaUseCase";
import { IProdutoRepository } from "./IProdutoRepository";
import { IRegistraProdutoUseCase } from "./IRegistraProdutoUseCase";

export interface IProdutoService extends IRegistraProdutoUseCase, IListaProdutoPorCategoriaUseCase, IAlteraProdutoUseCase, IBuscaProdutoUseCase {
    produtoRepository?: IProdutoRepository;
}