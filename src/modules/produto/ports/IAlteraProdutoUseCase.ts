import { AlteraProdutoDTO, AlteraProdutoOutputDTO } from "../dto/AlteraProdutoDTO";
import { RegistraProdutoDTO, RegistraProdutoOutputDTO } from "../dto/RegistraProdutoDTO";

export interface IAlteraProdutoUseCase {
    alteraProduto(data: AlteraProdutoDTO): Promise<AlteraProdutoOutputDTO>;
}