import { ListaProdutoCategoriaDTO, ListaProdutoCategoriaOutputDTO } from '../dto/ListaProdutoCategoriaDTO'

export interface IListaProdutoPorCategoriaUseCase {
  buscaProdutoPorCategoria(data: ListaProdutoCategoriaDTO): Promise<ListaProdutoCategoriaOutputDTO>
}
