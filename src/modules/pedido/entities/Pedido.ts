import { EStatus } from "./EStatus";
import { ItemDePedido } from "./ItemDePedido";

export class Pedido {
    public codigo: number | undefined;
    constructor(
        readonly cpf: string,
        readonly status: EStatus,
        readonly itensDePedido: Array<ItemDePedido>
    ) {}
}