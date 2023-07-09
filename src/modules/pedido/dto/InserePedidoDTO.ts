import { CustomError, CustomErrorType } from "../../../utils/customError";

export class InserePedidoDTO {
    constructor(
        readonly CPF: string | null,
        readonly produtosPedidoCodigo: Array<{codigo: number}>
    ){}

    private validaItemDePedido(): boolean {
        if(!this.produtosPedidoCodigo) return false;
        if(this.produtosPedidoCodigo.length === 0) return false;
        if(this.produtosPedidoCodigo.some((item) => {
            return typeof item.codigo !== 'number' || item.codigo <= 0
        })) return false;
        return true;
    }

    public validaDTO(): void {
        const erros: Array<String> = [];
        if(!this.validaItemDePedido()) erros.push('Um ou mais itens do pedido é inválido');
        if(erros.length > 0) {
            throw new CustomError(CustomErrorType.InvalidInputDTO, erros.join("\n"));
        }
    }
}
