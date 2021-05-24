import { Sequelize } from "sequelize-typescript";
import path from "path";

import logger from "./logger";
import env from "./env";

const defaultOpts = {
  models: [path.join(__dirname, "/models")],
  logging: logger.debug.bind(logger)
};

const opts = (nodeEnv : String) => {
  if (nodeEnv === "production") {
    return {
      ...defaultOpts,
      ...{
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    };
  }
  return defaultOpts;
};

const db = new Sequelize(
  env.DATABASE_URL,
  opts(env.NODE_ENV)
);

export default db;
