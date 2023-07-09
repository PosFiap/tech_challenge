import logger from "./LoggerFactory";

export enum CustomErrorType {
    "InvalidInputDTO",
    "BusinessRuleViolation",
    "RepositoryUnknownError",
    "RepositoryDataNotFound"
}

export class CustomError extends Error {
  
    constructor(readonly type: CustomErrorType, message: string) {
      super(message);
  
      if (Error.captureStackTrace) {
        logger.error(`Error type: ${CustomErrorType[type]} - message: ${message}`);
        Error.captureStackTrace(this, CustomError)
      }
    }
  }