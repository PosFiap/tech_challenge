export interface IServicoPagamentoGateway {

    obtemFaturaPagamento(valor: number): Promise<string>;
}