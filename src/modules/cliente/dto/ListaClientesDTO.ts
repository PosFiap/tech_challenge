export class ItemListaCliente {
    constructor(
        readonly cpf: string,
        readonly email: string,
        readonly nome: string
    ){}
}

export class ListaClientesOutputDTO {
    constructor(
        readonly itemListaCliente: Array<ItemListaCliente>
    ) {}

    public toJSON = () : any => {
        return this.itemListaCliente
    }
}