import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "./passport";
import users from "./routes/users";
import sessions from "./routes/sessions";
import publications from "./routes/publications";
import purchases from "./routes/purchases";
import structure from "./routes/structure";
import env from "./env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", users);
app.use("/sessions", sessions);
app.use("/publications", publications);
app.use("/purchases", purchases);
app.use("/structure", structure);

export default app;
