import { CPF, EStatus } from '../../../modules/common/value-objects'
import { AtualizaStatusPedidoOutputDTO, IPedidoRepositoryGateway, IPedidoUseCases, ItemListaPedidoOutputDTO } from '../../../modules/pedido'
import { Produto } from '../../../modules/pedido/model/Produto'

export class RegistraPedidoOutput {
  constructor(
    readonly codigoPedido: number,
    readonly status: EStatus,
    readonly cpf: CPF | null,
    readonly dataPedido: Date,
    readonly produtos: Array<Produto>
  ){}
}

export interface IPedidoController {

  pedidoService: IPedidoUseCases

  moveStatusEmPreparacao(
    data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusPronto(data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusFinalizado(data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  listaPedidos(
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<ItemListaPedidoOutputDTO[]>

  registraPedido(
    data: { cpf: string | null, produtoPedido: Array<{ codigo: number }> },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<RegistraPedidoOutput>
}
