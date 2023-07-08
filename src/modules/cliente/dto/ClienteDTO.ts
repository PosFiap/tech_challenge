export interface ClienteDTO {
    cpf: string,
    email: string,
    nome: string
}

export interface ClienteRegistryDTO {
    codigo: number,
    cpf: string | null,
    email: string | null,
    nome: string | null
}