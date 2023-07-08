export class AtualizaStatusPedidoOutputDTO {
    constructor(
        readonly codigoPedido: number,
        readonly status: string,
    ){}
}