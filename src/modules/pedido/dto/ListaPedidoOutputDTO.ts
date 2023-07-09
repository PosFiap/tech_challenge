import { CPF as CPFVO } from "../../common/value-objects/CPF";

export class ItemListaPedidoOutputDTO {

    private _CPF: CPFVO | null;

    constructor(
        readonly status: string,
        readonly codigo: number,
        CPF: string | null,
        readonly produtosPedido: Array<ItemPedidoListaPedidoOutputDTO>
    ) {
        this._CPF = CPF ? new CPFVO(CPF) : null;
    }

    get CPF() {
        return this._CPF?.valor;
    }

    get valorTotal() {
        const valorTotal = this.produtosPedido.reduce((valorSoma, item) => item.valor + valorSoma, 0);
        return valorTotal.toFixed(2);
    }

    get quantidadeProdutosPedido() {
        return this.produtosPedido.length;
    }
}

export class ItemPedidoListaPedidoOutputDTO {
    constructor(
        readonly nome: string,
        readonly valor: number,
        readonly categoria: string,
    ){}
}