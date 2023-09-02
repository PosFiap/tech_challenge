import { EStatusPagamento } from '../../modules/common/value-objects/EStatusPagamento'
import { CheckoutService, ICheckoutService, IPagamentoRepositoryGateway } from '../../modules/pagamento'
import { MeioPagamentoMercadoPago } from '../gateways/MeioPagamentoMercadoPago'
import { HttpClientMock } from '../infra/HttpsMock'
import { IPagamentoDetalhadoPresenterFactory } from '../presenter/interfaces/IPagamentoDetalhadoPresenterFactory'
import { IPagamentoQrCodeController } from './IPagamentoQrCodeController'
import { IPagamentoController } from './interfaces/IPagamentoController'

export class PagamentoQrCodeController implements IPagamentoQrCodeController, IPagamentoController {
  private constructor (private readonly checkoutService: ICheckoutService<string>) {}
  
  atualizaSituacaoPagamentoAceito(
    id_fatura: string,
    pagamentoDetalhadoPresenterFactory: IPagamentoDetalhadoPresenterFactory
  ): Promise<Object> {
    return Promise.resolve(
      pagamentoDetalhadoPresenterFactory.create(
        0,
        0,
        id_fatura,
        EStatusPagamento['Aguardando Pagamento'],
        new Date(),
        new Date()
      ).format()
    )
  }

  atualizaSituacaoPagamentoRejeitado(
    id_fatura: string,
    pagamentoDetalhadoPresenterFactory: IPagamentoDetalhadoPresenterFactory
  ): Promise<Object> {
    return Promise.resolve(
      pagamentoDetalhadoPresenterFactory.create(
        0,
        0,
        id_fatura,
        EStatusPagamento.Rejeitado,
        new Date(),
        new Date()
      ).format()
    )
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
