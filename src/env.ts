import process from "process";
import { load } from "ts-dotenv";

const envName = process.env.NODE_ENV ?? "development";

const env = load({
  SESSION_SECRET: String,
  DATABASE_URL: String
}, `.env.${envName}`);

export default env;
