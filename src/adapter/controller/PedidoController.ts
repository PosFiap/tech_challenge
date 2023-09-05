import { AtualizaStatusPedidoDTO, AtualizaStatusPedidoOutputDTO, IPedidoUseCases, ItemListaPedidoAndamentoOutputDTO, InserePedidoDTO, PedidoUseCases, IPedidoRepositoryGateway } from '../../modules/pedido'
import { IPedidoController, ItemListaPedidosAndamentoOutput, ItemListaPedidosAndamentoProdutoOutput, ListaPedidosAndamentoOutput, RegistraPedidoOutput } from './interfaces/IPedidoController'
import { PrismaPedidoRepositoryGateway } from '../persistence/PedidoRepository'
import { EStatus } from '../../modules/common/value-objects/EStatus'
import { IPedidoDetalhadoPresenterJSONFormat } from '../presenter/interfaces/IPedidoDetalhadoPresenter'
import { IPedidoDetalhadoPresenterFactory } from '../presenter/interfaces/IPedidoDetalhadoPresenterFactory'
import { CPF } from '../../modules/common/value-objects'
import { IPagamentoRepositoryGateway, IPagamentoUseCases } from '../../modules/pagamento'
import { CriaFaturaPagamentoDTO } from '../../modules/pagamento/dto/CriaFaturaPagamentoDTO'
import { IServicoPagamentoGateway } from '../gateways/servicos-pagamento/interfaces/IServicoPagamentoGateway'

export class PedidoController implements IPedidoController {
  private constructor (
    readonly pedidoUseCase: IPedidoUseCases
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
      const result = await this.pedidoUseCase.atualizaStatus(inputDTO, pedidoRepositoryGateway)
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
      const result = await this.pedidoUseCase.atualizaStatus(inputDTO,pedidoRepositoryGateway)
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
      const result = await this.pedidoUseCase.atualizaStatus(inputDTO,pedidoRepositoryGateway)
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async registraPedido(
      data: { cpf: string | null; produtoPedido: { codigo: number }[] },
      pedidoRepositoryGateway: IPedidoRepositoryGateway,
      pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
      pagamentoUseCases: IPagamentoUseCases,
      servicoPagamentoGateway: IServicoPagamentoGateway
    ): Promise<RegistraPedidoOutput> {
    try {
      const inputDTO = new InserePedidoDTO(data.cpf, data.produtoPedido)
      const pedidoCompleto = await this.pedidoUseCase.registraPedido(inputDTO, pedidoRepositoryGateway);
      const codigoFatura = await servicoPagamentoGateway.obtemFaturaPagamento(pedidoCompleto.valor);
      const criaFaturaPagamentoDTO = new CriaFaturaPagamentoDTO(codigoFatura, pedidoCompleto.codigo);
      const faturaCompleta = await pagamentoUseCases.criaFaturaPagamento(criaFaturaPagamentoDTO, pagamentoRepositoryGateway);
      
      return new RegistraPedidoOutput(
        pedidoCompleto.codigo,
        pedidoCompleto.status,
        pedidoCompleto.CPF,
        pedidoCompleto.dataPedido,
        pedidoCompleto.itensPedido,
        faturaCompleta.fatura_id
      );


    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedidosAndamento (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ListaPedidosAndamentoOutput> {
    try {
      const listaPedidos = await this.pedidoUseCase.listaPedidosAndamento(pedidoRepositoryGateway);
      return new ListaPedidosAndamentoOutput(listaPedidos.map((pedido) => {
        return new ItemListaPedidosAndamentoOutput(
          pedido.codigo,
          pedido.status,
          pedido.CPF ? new CPF(pedido.CPF) : null,
          pedido.dataPedido,
          pedido.produtosPedido.map((produto) => {
            return new ItemListaPedidosAndamentoProdutoOutput(
              produto.nome,
              produto.valor
            )
          }));
      }));
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
