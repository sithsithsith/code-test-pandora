import winston, { format } from "winston";

const { combine, timestamp, prettyPrint } = format;

export function getLogger() {
  const logger = winston.createLogger({
    level: "info",
    format: combine(prettyPrint(), winston.format.colorize(), timestamp()),
    defaultMeta: { service: "posts-service" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "logs/combined.log" }),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }
  return logger;
}
