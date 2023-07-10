import { IAlteraProdutoUseCase } from "./IAlteraProdutoUseCase";
import { IBuscaProdutoUseCase } from "./IBuscaProdutoUseCase";
import { IDeletaProdutoUseCase } from "./IDeletaProdutoUseCase";
import { IListaProdutoPorCategoriaUseCase } from "./IListaProdutoPorCategoriaUseCase";
import { IProdutoRepository } from "./IProdutoRepository";
import { IRegistraProdutoUseCase } from "./IRegistraProdutoUseCase";

export interface IProdutoService extends IRegistraProdutoUseCase, IListaProdutoPorCategoriaUseCase, IAlteraProdutoUseCase, IBuscaProdutoUseCase, IDeletaProdutoUseCase {
    produtoRepository?: IProdutoRepository;
}
