import { createLogger, format, transports } from "winston";

const { combine, timestamp: timestamps, printf } = format;
const { Console } = transports;

export default createLogger({
  format: combine(
    timestamps(),
    printf(({ level, message, timestamp }) => `[${level}] ${timestamp}: ${message}`)
  ),
  transports: new Console()
});
