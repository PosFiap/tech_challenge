export class AtualizaStatusPedidoOutputDTO {
  constructor (
    readonly codigoPedido: number,
    readonly status: string,
    readonly codigoStatus: number
  ) {}
}
