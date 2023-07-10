export interface Erro<T> {
  erro: T
  sucesso?: never
}

export interface Sucesso<U> {
  erro?: never
  sucesso: U
}

export type Either<T, U> = NonNullable<Erro<T> | Sucesso<U>>
type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>

export const unwrapEither: UnwrapEither = <T, U>({
  erro,
  sucesso
}: Either<T, U>) => {
  if (sucesso !== undefined && erro !== undefined) {
    throw new Error(
      `Recebido ambos os valores de dados de Erro e Sucesso durante o runtime ao desempacotar either\nErro: ${JSON.stringify(
        erro
      )}\nSucesso: ${JSON.stringify(sucesso)}`
    )
  }

  if (erro !== undefined) {
    return erro as NonNullable<T>
  }

  if (sucesso !== undefined) {
    return sucesso as NonNullable<U>
  }

  throw new Error(
    'Não recebeu nenhum dos valores Erro ou Sucesso ao desempacotar either'
  )
}

export const isErro = <T, U>(e: Either<T, U>): e is Erro<T> => {
  return e.erro !== undefined
}

export const isSucesso = <T, U>(e: Either<T, U>): e is Sucesso<U> => {
  return e.sucesso !== undefined
}

export const makeErro = <T>(value: T): Erro<T> => ({ erro: value })

export const makeSucesso = <U>(value: U): Sucesso<U> => ({ sucesso: value })
