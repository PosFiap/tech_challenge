import { AlteraProdutoDTO, AlteraProdutoOutputDTO } from '../dto/AlteraProdutoDTO'

export interface IAlteraProdutoUseCase {
  alteraProduto(data: AlteraProdutoDTO): Promise<AlteraProdutoOutputDTO>
}
