import { IProdutoRepository } from "./IProdutoRepository";
import { IRegistraProdutoUseCase } from "./IRegistraProdutoUseCase";

export interface IProdutoService extends IRegistraProdutoUseCase {
    produtoRepository?: IProdutoRepository;
}