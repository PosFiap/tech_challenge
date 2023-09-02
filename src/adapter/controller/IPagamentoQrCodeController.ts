import { IPagamentoRepositoryGateway } from "../../modules/pagamento";
import { IPagamentoController } from "./interfaces/IPagamentoController";

export interface IPagamentoQrCodeController extends IPagamentoController {
  gerarPagamentoQrCode (codigoPedido: number, pagamentoPedidoRepositoryGateway: IPagamentoRepositoryGateway): Promise<string>
}
