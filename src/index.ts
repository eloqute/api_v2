import express from "express";
import logger from "./logger";
import users from "./routes/users";
import sessions from "./routes/sessions";
import publications from "./routes/publications";
import purchases from "./routes/purchases";

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/sessions", sessions);
app.use("/publications", publications);
app.use("/purchases", purchases);

app.get(
  "/",
  async (_req, res) => res.status(200).send({
    message: "Hello World!"
  })
);

try {
  app.listen(port, () => logger.info(`Connected successfully on port ${port}`));
} catch (error) {
  logger.error(`Error occured: ${error.message}`);
}
