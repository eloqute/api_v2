import { createLogger, format, transports } from "winston";

import env from "./env";

const { combine, timestamp: timestamps, printf } = format;
const { Console } = transports;

export default createLogger({
  format: combine(
    timestamps(),
    printf(({ level, message, timestamp }) => `[${level}] ${timestamp}: ${message}`)
  ),
  transports: new Console({ level: env.LOG_LEVEL })
});
