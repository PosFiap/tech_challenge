import { Pedido } from '../model/Pedido'
import { Produto } from '../model/Produto'

export interface IPedidoRepository {
  atualizaPedido(pedido: Pedido): Promise<Pedido>
  registraPedido(pedido: Pedido): Promise<Pedido>
  listaPedidos(config: { vinculaProdutos: boolean }): Promise<Pedido[]>
  obtemPedido(codigoPedido: number): Promise<Pedido>
  buscaProdutoPorCodigo(codigo: number): Promise<Produto>
}
