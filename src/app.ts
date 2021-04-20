import express from "express";
import users from "./routes/users";
import sessions from "./routes/sessions";
import publications from "./routes/publications";
import purchases from "./routes/purchases";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", users);
app.use("/sessions", sessions);
app.use("/publications", publications);
app.use("/purchases", purchases);

export default app;
