export class PedidoOutputDTO {
  constructor (
    readonly status: string,
    readonly codigo: number,
    readonly valor: number
  ) {}
}
