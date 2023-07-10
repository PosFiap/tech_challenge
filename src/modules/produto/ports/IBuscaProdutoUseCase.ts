import { BuscarProdutoDTO, BuscarProdutoOutputDTO } from "../dto/BuscarProdutoDTO";

export interface IBuscaProdutoUseCase {
    buscaProduto(data: BuscarProdutoDTO): Promise<BuscarProdutoOutputDTO>;

}