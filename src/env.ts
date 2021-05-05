import { load } from "ts-dotenv";

const env = load({
  SESSION_SECRET: String,
  DATABASE_URL: String
});

export default env;
