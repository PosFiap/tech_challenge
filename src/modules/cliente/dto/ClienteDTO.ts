export interface ClienteDTO {
    cpf: string,
    email: string,
    nome: string
}

export class ClienteOuputDTO {

    constructor(
        readonly cpf: string,
        readonly email: string,
        readonly nome: string
    ){}
}