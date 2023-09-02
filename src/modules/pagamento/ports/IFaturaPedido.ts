export interface IFaturaPedido {
    fatura_id: string,
    data_criacao: Date,
    data_atualizacao: Date,
    situacao: string,
    Pedido: {
        codigo: number,
        cpf_cliente: string,
    }
}