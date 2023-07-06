export interface ClienteDTO {
    codigo?: number,
    cpf: string,
    email: string,
    nome: string
}

export interface ClienteRegistryDTO {
    cpf: string | null,
    email: string | null,
    nome: string | null
}

export interface ErrorDTO {
    menssagem: string
}