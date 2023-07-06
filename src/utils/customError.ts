export enum CustomErrorType {
  InvalidInputDTO = 'InvalidInputDTO',
  BusinessRuleViolation = 'BusinessRuleViolation',
  RepositoryUnknownError = 'RepositoryUnknownError',
  RepositoryDataNotFound = 'RepositoryDataNotFound',
  InstantiatingError = 'InstantiatingError'
}

export class CustomError extends Error {
  constructor (readonly type: CustomErrorType, message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
  }
}
