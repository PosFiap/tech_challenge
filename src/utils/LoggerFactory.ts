import { createLogger, transports, format } from 'winston'
import expressWinston from 'express-winston'

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'logs/complete.log'
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log'
    }),
    new transports.Console()
  ],
  handleExceptions: true,

  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp as string}] ${level}: ${message as string}`
    })
  )
})

export const loggerExpress = (): any => {
  return expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: (req, res) => {
      return `HTTP ${res.statusCode} - ${req.method} {{res.responseTime}}ms ${req.url} - Request Body: ${JSON.stringify(req.body)}`
    },
    statusLevels: {
      success: 'info',
      warn: 'warn',
      error: 'error'
    }
  })
}

export default logger
