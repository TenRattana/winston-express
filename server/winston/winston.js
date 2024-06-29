const path = require("path");
const fs = require("fs");
const winston = require("winston");

const Log = "Logger";

const aLog = path.join(Log, "accessLog.log");
const rLog = path.join(Log, "rejectLog.log");

const env = process.env.NODE_ENV || "dev";

if (!fs.existsSync(Log)) {
  fs.mkdirSync(Log);
}

const accessLogger = winston.createLogger({
  level: env === "dev" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toLocaleUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: aLog,
    }),
  ],
});

const rejectionLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toLocaleUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: rLog }),
  ],
});

module.exports = { accessLogger, rejectionLogger };
