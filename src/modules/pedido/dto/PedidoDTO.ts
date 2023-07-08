export class PedidoDTO {
    constructor(
        readonly CPF: string | null,
        readonly itemDePedido: Array<{codigo: number}>
    ){}

    private validaItemDePedido(): boolean {
        if(!this.itemDePedido) return false;
        if(this.itemDePedido.length === 0) return false;
        if(this.itemDePedido.some((item) => {
            return typeof item.codigo !== 'number' || item.codigo < 0
        })) return false;
        return true;
    }

    public validaDTO(): Array<String> {
        const erros: Array<String> = [];
        if(!this.validaItemDePedido()) erros.push('Um ou mais itens do pedido é inválido');
        return erros;
    }
}