export enum CustomErrorType {
    "InvalidInput",
    "BusinessRuleViolation",
    "RepositoryUnknownError",
    "RepositoryDataNotFound",
    "EntityViolation",
}

export class CustomError extends Error {
  
    constructor(readonly type: CustomErrorType, message: string) {
      super(message);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError)
      }
    }
  }