import { EStatus } from "../value-objects/EStatus";
import { ItemDePedido } from "./ItemDePedido";

export class Pedido {
    
    constructor(
        readonly CPF: string | null,
        readonly status: EStatus,
        readonly itensDePedido: Array<ItemDePedido>,
        readonly codigo: number | null
    ) {}
}