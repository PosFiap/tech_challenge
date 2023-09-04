import { AtualizaStatusPedidoDTO, PedidoService } from '../../modules/pedido'
import { IAtualizaStatusPedidoUseCase } from '../../modules/pedido/ports/IAtualizaStatusPedidoUseCase'
import { MeioPagamentoUpdateStatus } from '../gateways/MeioPagamentoUpdateStatus'
import { HttpClient } from '../infra/Http'
import { PrismaPedidoRepository } from '../persistence/PedidoRepository'
import { IProcessaEventoPagamentoController } from './IProcessaEventoPagamentoController'

export class ProcessaEventoPagamentoController implements IProcessaEventoPagamentoController {
  private constructor (
    private readonly _gateway: MeioPagamentoUpdateStatus,
    private readonly atualizaUseCase: IAtualizaStatusPedidoUseCase
  ) {}

  async processaEvento (id: string, topic: string): Promise<void> {
    const statusPayment = await this._gateway.getStatusPedidoByEvent(topic, id)

    if (statusPayment.status === 'PAID') {
      await this.atualizaUseCase.atualizaStatus(
        new AtualizaStatusPedidoDTO(parseInt(statusPayment.pedido!, 10), 1)
      )
    }
  }

  static create (
    gateway?: MeioPagamentoUpdateStatus,
    atualizaStatusUseCase?: IAtualizaStatusPedidoUseCase
  ): IProcessaEventoPagamentoController {
    if (!gateway) {
      gateway = new MeioPagamentoUpdateStatus(
        new HttpClient(),
        process.env.ACCESS_TOKEN
      )
    }

    if (!atualizaStatusUseCase) {
      atualizaStatusUseCase = new PedidoService(new PrismaPedidoRepository())
    }

    return new ProcessaEventoPagamentoController(
      gateway,
      atualizaStatusUseCase
    )
  }
}
