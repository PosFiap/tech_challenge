import { RegistraProdutoDTO, RegistraProdutoOutputDTO } from '../dto/RegistraProdutoDTO'

export interface IRegistraProdutoUseCase {
  registraProduto(data: RegistraProdutoDTO): Promise<RegistraProdutoOutputDTO>
}
