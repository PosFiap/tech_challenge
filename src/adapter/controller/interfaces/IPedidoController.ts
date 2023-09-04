import { CPF, ECategoria, EStatus } from '../../../modules/common/value-objects'
import { AtualizaStatusPedidoOutputDTO, IPedidoRepositoryGateway, IPedidoUseCases, ItemListaPedidoAndamentoOutputDTO } from '../../../modules/pedido'
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

export class ListaPedidosAndamentoOutput {
  constructor( readonly pedidos: ItemListaPedidosAndamentoOutput[] ) {}
}

export class ItemListaPedidosAndamentoOutput {
    constructor(
      readonly codigoPedido: number,
      readonly status: EStatus,
      readonly cpf: CPF | null,
      readonly dataPedido: Date,
      readonly produtos: Array<ItemListaPedidosAndamentoProdutoOutput>
    ){}
}

export class ItemListaPedidosAndamentoProdutoOutput {
  constructor(
    readonly nome: string,
    readonly valor: number,
  ){}
}

export interface IPedidoController {

  pedidoUseCase: IPedidoUseCases

  moveStatusEmPreparacao(
    data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusPronto(data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>
  moveStatusFinalizado(data: { codigoPedido: number },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<AtualizaStatusPedidoOutputDTO>;

  listaPedidosAndamento(
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<ListaPedidosAndamentoOutput>;

  registraPedido(
    data: { cpf: string | null, produtoPedido: Array<{ codigo: number }> },
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<RegistraPedidoOutput>
}
