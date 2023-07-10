import { DeletaProdutoDTO, DeletaProdutoOutputDTO } from "../dto/DeletaProdutoDTO";

export interface IDeletaProdutoUseCase {
    deletaProduto(data: DeletaProdutoDTO): Promise<DeletaProdutoOutputDTO>
}