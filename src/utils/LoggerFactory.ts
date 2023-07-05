import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/complete.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new transports.Console(),
  ],
    handleExceptions: true,
    
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });

export default logger;
