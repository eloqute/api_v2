import app from "./app";
import env from "./env";
import logger from "./logger";

const port = env.PORT;

try {
  app.listen(port, () => logger.info(`Connected successfully on port ${port}`));
} catch (error) {
  logger.error(`Error occured: ${error.message}`);
}
