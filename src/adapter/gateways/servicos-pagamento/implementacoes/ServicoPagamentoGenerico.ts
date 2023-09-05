import { IServicoPagamentoGateway } from "../interfaces/IServicoPagamentoGateway";

export class ServicoPagamentoGatewayGenerico implements IServicoPagamentoGateway {
    async obtemFaturaPagamento(valor: number): Promise<string> {
        return "1234" + Math.random();
    }
}