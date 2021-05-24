import process from "process";
import { load } from "ts-dotenv";

const envName = process.env.NODE_ENV ?? "development";

const Environment = [
  "development" as const,
  "test" as const,
  "production" as const
];

const env = load({
  SESSION_SECRET: String,
  DATABASE_URL: String,
  LOG_LEVEL: String,
  NODE_ENV: {
    type: Environment,
    default: "development"
  },
  PORT: {
    type: Number,
    default: 3000
  }
}, `.env.${envName}`);

export default env;
