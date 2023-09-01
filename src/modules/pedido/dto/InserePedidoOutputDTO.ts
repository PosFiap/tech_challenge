import { EStatus } from "../../common/value-objects/EStatus";
import { Produto } from "../model/Produto";

export class InserePedidoOutputDTO {
  constructor (
    readonly status: EStatus,
    readonly codigo: number,
    readonly valor: number,
    readonly itensPedido: Array<Produto>
  ) {}
}
