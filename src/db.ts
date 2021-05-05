import { Sequelize } from "sequelize-typescript";
import path from "path";
import env from "./env";

const db = new Sequelize(env.DATABASE_URL, {
  repositoryMode: true,
  models: [path.join(__dirname, "/models")]
});

export default db;
