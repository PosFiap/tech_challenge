import { IServicoPagamentoGateway } from '../interfaces/IServicoPagamentoGateway'

export class ServicoPagamentoGatewayGenerico implements IServicoPagamentoGateway {
  async obtemFaturaPagamento (valor: number): Promise<string> {
    return `PAG-${Math.round(Math.random() * 9999999999).toString().padEnd(10, '0')}`;
  }
}

