import { createLogger, transports } from "winston";
import { NODE_ENV } from "./config.js";

const symbolMap = {
  debug: "\u001b[32m\u221A",
  error: "\u001b[31m\u00D7",
  info: "\u001b[36m\u221A"
};

function logData(info, next) {
  const symbol = symbolMap[info.level];
  console.log(
    `${symbol} { level: ${
      info.level
    }, time: ${new Date().toLocaleString()} }\u001b[0m`,
    info.message
  );
  next();
}
const options = {
  transports: [
    new transports.Console({
      level: NODE_ENV === "production" ? "error" : "debug",
      log: logData,
    }),
    new transports.File({
      filename: "./logs/debug.log",
      level: "debug"
    }),
  ],
};

const logger = createLogger(options);

export default logger;
