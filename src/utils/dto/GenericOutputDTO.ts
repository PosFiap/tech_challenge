
export interface GenericOutputDTO {
  code: number
  message: string
  details?: string
}

export class GenericOutputErrorDTO implements GenericOutputDTO {
  code!: number
  message!: string
  details!: string

  constructor (code: number, message: string, details?: string) {
    this.code = code
    this.message = message
    if (details) {
      this.details = details
    }
  }
}
