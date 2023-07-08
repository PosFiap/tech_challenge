export enum CustomErrorType {
  'InvalidInputDTO',
  'BusinessRuleViolation',
  'RepositoryUnknownError',
  'RepositoryDataNotFound',
  'InstantiatingError'
}

export class CustomError extends Error {
  constructor (readonly type: CustomErrorType, message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
  }
}
