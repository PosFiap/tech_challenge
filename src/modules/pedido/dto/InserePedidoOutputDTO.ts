import { CPF } from "../../common/value-objects";
import { EStatus } from "../../common/value-objects/EStatus";
import { Produto } from "../model/Produto";

export class InserePedidoOutputDTO {
  constructor (
    readonly status: EStatus,
    readonly codigo: number,
    readonly valor: number,
    readonly CPF: CPF | null,
    readonly dataPedido: Date,
    readonly itensPedido: Array<Produto>
  ) {}
}
