import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO, IPedidoService, ItemListaPedidoOutputDTO, InserePedidoDTO, PedidoService } from '../../modules/pedido'
import { IPedidoController } from './IPedidoController'
import { PrismaPedidoRepository } from '../persistence/PedidoRepository'
import { EStatus } from '../../modules/common/value-objects/EStatus'
import { IPedidoDetalhadoPresenterJSONFormat } from '../presenter/interfaces/IPedidoDetalhadoPresenter'
import { IPedidoDetalhadoPresenterFactory } from '../presenter/interfaces/IPedidoDetalhadoPresenterFactory'

export class PedidoController implements IPedidoController {
  private constructor (
    readonly pedidoService: IPedidoService
  ) {}

  static create (configuration: string = 'default'): PedidoController {
    if (configuration === 'default') {
      const repository = new PrismaPedidoRepository()
      const service = new PedidoService(repository)
      return new PedidoController(service)
    }
    throw new Error('Invalid Configuration Setup')
  }

  async moveStatusEmPreparacao (data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO> {
    try {
      const inputDTO = new AtualizaStatusPedidoDTO(
        data.codigoPedido,
        EStatus['Em preparação']
      )
      const result = await this.pedidoService.atualizaStatus(inputDTO)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async moveStatusPronto (data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO> {
    try {
      const inputDTO = new AtualizaStatusPedidoDTO(
        data.codigoPedido,
        EStatus.Pronto
      )
      const result = await this.pedidoService.atualizaStatus(inputDTO)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async moveStatusFinalizado (data: { codigoPedido: number }): Promise<AtualizaStatusPedidoOutputDTO> {
    try {
      const inputDTO = new AtualizaStatusPedidoDTO(
        data.codigoPedido,
        EStatus.Finalizado
      )
      const result = await this.pedidoService.atualizaStatus(inputDTO)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async registraPedido(
      data: { cpf: string | null; produtoPedido: { codigo: number }[] }, pedidoDetalhadoPresenterFactory: IPedidoDetalhadoPresenterFactory
    ): Promise<IPedidoDetalhadoPresenterJSONFormat> {
    try {
      const inputDTO = new InserePedidoDTO(data.cpf, data.produtoPedido)
      const pedidoCompleto = await this.pedidoService.registraPedido(inputDTO)
      const pedidoDetalhado = pedidoDetalhadoPresenterFactory.create(
        pedidoCompleto.status,
        pedidoCompleto.codigo,
        pedidoCompleto.itensPedido
      )
      return pedidoDetalhado.format() as IPedidoDetalhadoPresenterJSONFormat;

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedidos (): Promise<ItemListaPedidoOutputDTO[]> {
    try {
      return this.pedidoService.listaPedidos()
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
