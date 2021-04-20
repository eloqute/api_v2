import app from "./app";
import logger from "./logger";

const port = 3000;

try {
  app.listen(port, () => logger.info(`Connected successfully on port ${port}`));
} catch (error) {
  logger.error(`Error occured: ${error.message}`);
}
