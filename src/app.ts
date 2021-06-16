import express from "express";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import SequelizeStoreConstructor from "connect-session-sequelize";
import passport from "./passport";
import users from "./routes/users";
import sessionRoute from "./routes/session";
import structure from "./routes/structure";
import books from "./routes/books";
import book from "./routes/book";
import env from "./env";
import db from "./db";

const app = express();

const SequelizeStore = SequelizeStoreConstructor(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db,
    tableName: "Sessions",
    extendDefaultFields: (defaults, sess) => ({
      data: defaults.data,
      expires: defaults.expires,
      userId: sess.passport?.user
    })
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", users);
app.use("/session", sessionRoute);
app.use("/structure", structure);
app.use("/books", books);
app.use("/book", book);
app.use(
  "/docs",
  express.static(
    path.join(__dirname, "..", "dist", "docs"),
    { fallthrough: false }
  )
);
export default app;
