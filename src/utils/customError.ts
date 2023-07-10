import logger from './LoggerFactory'

export enum CustomErrorType {
    "InvalidInput",
    "BusinessRuleViolation",
    "RepositoryUnknownError",
    "RepositoryDataNotFound",
    "DuplicatedItem",
    "EntityViolation",
    "EntityForeignKey"
}

export class CustomError extends Error {
  constructor (readonly type: CustomErrorType, message: string) {
    super(message)

    if (Error.captureStackTrace) {
      logger.error(`Error type: ${CustomErrorType[type]} - message: ${message}`)
      Error.captureStackTrace(this, CustomError)
    }
  }
}
