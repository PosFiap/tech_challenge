import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO, IPedidoUseCases, ItemListaPedidoOutputDTO, InserePedidoDTO, PedidoUseCases, IPedidoRepositoryGateway } from '../../modules/pedido'
import { IPedidoController } from './interfaces/IPedidoController'
import { PrismaPedidoRepositoryGateway } from '../persistence/PedidoRepository'
import { EStatus } from '../../modules/common/value-objects/EStatus'
import { IPedidoDetalhadoPresenterJSONFormat } from '../presenter/interfaces/IPedidoDetalhadoPresenter'
import { IPedidoDetalhadoPresenterFactory } from '../presenter/interfaces/IPedidoDetalhadoPresenterFactory'

export class PedidoController implements IPedidoController {
  private constructor (
    readonly pedidoService: IPedidoUseCases
  ) {}

  static create (configuration: string = 'default'): PedidoController {
    if (configuration === 'default') {
      const service = new PedidoUseCases();
      return new PedidoController(service)
    }
    throw new Error('Invalid Configuration Setup')
  }

  async moveStatusEmPreparacao (data: { codigoPedido: number }, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO> {
    try {
      const inputDTO = new AtualizaStatusPedidoDTO(
        data.codigoPedido,
        EStatus['Em preparação']
      )
      const result = await this.pedidoService.atualizaStatus(inputDTO, pedidoRepositoryGateway)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async moveStatusPronto (data: { codigoPedido: number }, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO> {
    try {
      const inputDTO = new AtualizaStatusPedidoDTO(
        data.codigoPedido,
        EStatus.Pronto
      )
      const result = await this.pedidoService.atualizaStatus(inputDTO,pedidoRepositoryGateway)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async moveStatusFinalizado (data: { codigoPedido: number }, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<AtualizaStatusPedidoOutputDTO> {
    try {
      const inputDTO = new AtualizaStatusPedidoDTO(
        data.codigoPedido,
        EStatus.Finalizado
      )
      const result = await this.pedidoService.atualizaStatus(inputDTO,pedidoRepositoryGateway)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async registraPedido(
      data: { cpf: string | null; produtoPedido: { codigo: number }[] },
      pedidoDetalhadoPresenterFactory: IPedidoDetalhadoPresenterFactory,
      pedidoRepositoryGateway: IPedidoRepositoryGateway
    ): Promise<Object> {
    try {
      const inputDTO = new InserePedidoDTO(data.cpf, data.produtoPedido)
      const pedidoCompleto = await this.pedidoService.registraPedido(inputDTO, pedidoRepositoryGateway);

      const pedidoDetalhado = pedidoDetalhadoPresenterFactory.create(
        pedidoCompleto.status,
        pedidoCompleto.codigo,
        pedidoCompleto.itensPedido
      );

      return pedidoDetalhado.format();

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedidos (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoOutputDTO[]> {
    try {
      return this.pedidoService.listaPedidos(pedidoRepositoryGateway);
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
