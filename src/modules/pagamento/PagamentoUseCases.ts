import { CustomError, CustomErrorType } from "../../utils";
import { CPF, EStatusPagamento } from "../common/value-objects";
import { ConfirmaPagamentoFaturaDTO, ConfirmaPagamentoFaturaOutputDTO, ObtemSituacaoPagamentoFaturaDTO, ObtemSituacaoPagamentoFaturaOutputDTO } from "./dto";
import { CriaFaturaPagamentoDTO } from "./dto/CriaFaturaPagamentoDTO";
import { CriaFaturaPagamentoOutputDTO } from "./dto/CriaFaturaPagamentoOutputDTO";
import { Fatura } from "./model";
import { IPagamentoRepositoryGateway, IPagamentoUseCases } from "./ports";

export class PagamentoUseCases implements IPagamentoUseCases {
  
    async criaFaturaPagamento(data: CriaFaturaPagamentoDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<CriaFaturaPagamentoOutputDTO> {
      const { codigo_pedido, codigo_fatura } = data;

      const faturaCriada = await pagamentoRepositoryGateway.criaFatura( codigo_fatura, codigo_pedido );

      return new CriaFaturaPagamentoOutputDTO(
        faturaCriada.codigo,
        faturaCriada.dataCriacao,
        faturaCriada.dataAtualizacao,
        faturaCriada.status,
        faturaCriada.pedido.codigo,
        faturaCriada.pedido.CPF ? new CPF(faturaCriada.pedido.CPF) : null,
      );
    }

    async obtemSituacaoPagamentoFatura(data: ObtemSituacaoPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ObtemSituacaoPagamentoFaturaOutputDTO> {
        const { fatura_id } = data;
    
        let fatura: Fatura = await pagamentoRepositoryGateway.obtemFaturaPorCodigo(fatura_id);
    
        if(!fatura) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Não existe a fatura informada");
    
        return new ObtemSituacaoPagamentoFaturaOutputDTO(
          fatura.codigo,
          fatura.dataCriacao,
          fatura.dataAtualizacao,
          fatura.status,
          fatura.pedido.codigo,
          fatura.pedido.CPF
        );
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
}