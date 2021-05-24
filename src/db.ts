import { Sequelize } from "sequelize-typescript";
import path from "path";

import logger from "./logger";
import env from "./env";

const db = new Sequelize(
  env.DATABASE_URL,
  {
    models: [path.join(__dirname, "/models")],
    logging: logger.debug.bind(logger)
  }
);

export default db;
