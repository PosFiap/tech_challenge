export class InserePedidoOutputDTO {
    constructor(
        readonly status: string,
        readonly codigo: number,
        readonly valor: number
    ){}
}