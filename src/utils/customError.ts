export class CustomError extends Error {
  name: string

  constructor(name: string, message: string) {
    super(message)
    this.name = name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
  }
}
