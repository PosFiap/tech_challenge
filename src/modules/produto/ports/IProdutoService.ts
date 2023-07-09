import { IAlteraProdutoUseCase } from "./IAlteraProdutoUseCase";
import { IListaProdutoPorCategoriaUseCase } from "./IListaProdutoPorCategoriaUseCase";
import { IProdutoRepository } from "./IProdutoRepository";
import { IRegistraProdutoUseCase } from "./IRegistraProdutoUseCase";

export interface IProdutoService extends IRegistraProdutoUseCase, IListaProdutoPorCategoriaUseCase, IAlteraProdutoUseCase {
    produtoRepository?: IProdutoRepository;
}