import { CustomError, CustomErrorType } from '../../utils'
import { EStatus } from '../common/value-objects/EStatus'
import { EStatusPagamento } from '../common/value-objects/EStatusPagamento'
import { ConfirmaPagamentoFaturaDTO, ConfirmaPagamentoFaturaOutputDTO, PedidoPagamentoDTO } from './dto'
import { Fatura } from './model'
import { IMeioDePagamentoQR, IPagamentoRepositoryGateway, IPagamentoUseCases } from './ports'
import { ICheckoutService } from './ports/ICheckoutService';

export class CheckoutService<S> implements ICheckoutService<S>, IPagamentoUseCases {
  constructor (
    private readonly meioDePagamento: IMeioDePagamentoQR<PedidoPagamentoDTO, S>,
  ) {
    this.validaSeRecebeuOsParametros()
  }

  async confirmaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO> {
    const { fatura_id } = data;

    let fatura: Fatura = await pagamentoRepositoryGateway.obtemFaturaPorCodigo(fatura_id);

    if(!fatura) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Não existe a fatura informada");
    
    if(fatura.status !== EStatusPagamento['Aguardando Pagamento'])
      throw new CustomError(CustomErrorType.BusinessRuleViolation, "A fatura não aguarda pagamento");

    fatura = await pagamentoRepositoryGateway.atualizarStatusFatura(
      fatura_id,
      EStatusPagamento.Pago
    );

    return new ConfirmaPagamentoFaturaOutputDTO(
      fatura.codigo,
      fatura.dataCriacao,
      fatura.dataAtualizacao,
      fatura.status,
      fatura.pedido.codigo,
      fatura.pedido.CPF
    );
  }

  async rejeitaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO> {
    const { fatura_id } = data;
    
    let fatura: Fatura = await pagamentoRepositoryGateway.obtemFaturaPorCodigo(fatura_id);

    if(!fatura) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Não existe a fatura informada");
    
    if(fatura.status !== EStatusPagamento['Aguardando Pagamento'])
      throw new CustomError(CustomErrorType.BusinessRuleViolation, "A fatura não aguarda pagamento");

    fatura = await pagamentoRepositoryGateway.atualizarStatusFatura(
      fatura_id,
      EStatusPagamento.Rejeitado
    );

    return new ConfirmaPagamentoFaturaOutputDTO(
      fatura.codigo,
      fatura.dataCriacao,
      fatura.dataAtualizacao,
      fatura.status,
      fatura.pedido.codigo,
      fatura.pedido.CPF
    );
  }

  private validaSeRecebeuOsParametros (): void {
    if (!this.meioDePagamento) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'meioDePagamento é requerido.')
    }
  }

  async atualizaStatusPedidoPago (codigo: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<boolean> {
    try {
      await pagamentoPedidoRepositoryGateway.atualizarStatusPedidoPago(codigo, EStatus.Recebido)
      return true
    } catch (error) {
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (error as Error).message)
    }
  }

  async checkoutQrCode (codigoPedido: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<S> {
    const pedido = await pagamentoPedidoRepositoryGateway.obterPedidoPeloCodigo(codigoPedido)

    if (pedido.status >= EStatus.Recebido) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'O pedido já passou da etapa de pagamento!')
    }

    const result = await this.meioDePagamento.checkoutQrCode(pedido)
    return result
  }
}
