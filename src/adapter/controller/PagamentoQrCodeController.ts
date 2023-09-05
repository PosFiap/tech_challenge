import { EStatus } from '../../modules/common/value-objects'
import { CheckoutService, ConfirmaPagamentoFaturaDTO, ICheckoutService, IPagamentoRepositoryGateway, ObtemSituacaoPagamentoFaturaDTO } from '../../modules/pagamento'
import { AtualizaStatusPedidoDTO, IPedidoRepositoryGateway, IPedidoUseCases } from '../../modules/pedido'
import { MeioPagamentoMercadoPago } from '../gateways/servicos-pagamento/implementacoes/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../infra/HttpsMock'
import { IPagamentoQrCodeController } from './IPagamentoQrCodeController'
import { ConfirmaPagamentoEEnviaPedidoOutput, IPagamentoController, RejeitaPagamentoOutput, VerificaSituacaoPagamentoOutput } from './interfaces/IPagamentoController'

export class PagamentoQrCodeController implements IPagamentoQrCodeController, IPagamentoController {
  private constructor (private readonly checkoutService: ICheckoutService<string>) {}
  
  async verificaSituacaoPagamento(id_fatura: string, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<VerificaSituacaoPagamentoOutput> {
    const obtemSituacaoPagamentoFaturaDTO = new ObtemSituacaoPagamentoFaturaDTO(id_fatura);

    const fatura = await this.checkoutService.obtemSituacaoPagamentoFatura(obtemSituacaoPagamentoFaturaDTO, pagamentoRepositoryGateway);

    return new VerificaSituacaoPagamentoOutput(
      fatura.fatura_id,
      fatura.data_criacao,
      fatura.data_atualizacao,
      fatura.situacao,
      fatura.pedido_codigo,
      fatura.pedido_cpf
    );
  }
  
  async confirmaPagamentoEEnviaPedido(
    id_fatura: string,
    pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
    pedidoRepositoryGateway: IPedidoRepositoryGateway,
    pedidoUseCases: IPedidoUseCases
  ): Promise<ConfirmaPagamentoEEnviaPedidoOutput> {

    const confirmaPagamentoFaturaDTO = new ConfirmaPagamentoFaturaDTO(id_fatura);

    const fatura = await this.checkoutService.confirmaPagamentoFatura(confirmaPagamentoFaturaDTO, pagamentoRepositoryGateway);

    const atualizStatusDTO = new AtualizaStatusPedidoDTO(fatura.pedido_codigo, EStatus.Recebido);

    await pedidoUseCases.enviaPedido(atualizStatusDTO, pedidoRepositoryGateway);

    return new ConfirmaPagamentoEEnviaPedidoOutput(
      fatura.fatura_id,
      fatura.data_criacao,
      fatura.data_atualizacao,
      fatura.situacao,
      fatura.pedido_codigo,
      fatura.pedido_cpf
    );
  }

  async rejeitaPagamento(
    id_fatura: string,
    pagamentoRepositoryGateway: IPagamentoRepositoryGateway
  ): Promise<RejeitaPagamentoOutput> {
    const confirmaPagamentoFaturaDTO = new ConfirmaPagamentoFaturaDTO(id_fatura);
    
    const fatura = await this.checkoutService.rejeitaPagamentoFatura(confirmaPagamentoFaturaDTO, pagamentoRepositoryGateway);

    return new RejeitaPagamentoOutput(
      fatura.fatura_id,
      fatura.data_criacao,
      fatura.data_atualizacao,
      fatura.situacao,
      fatura.pedido_codigo,
      fatura.pedido_cpf
    );;
  }

  static create (checkoutService?: ICheckoutService<string>): IPagamentoQrCodeController {
    if (!checkoutService) {
      const qrCode = new MeioPagamentoMercadoPago(new HttpClientMock())
      const defauCheckoutService = new CheckoutService<string>(qrCode)
      return new PagamentoQrCodeController(defauCheckoutService)
    }
    return new PagamentoQrCodeController(checkoutService)
  }

  async gerarPagamentoQrCode (codigoPedido: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<string> {
    const result = await this.checkoutService.checkoutQrCode(codigoPedido, pagamentoPedidoRepositoryGateway);
    return result
  }
}
