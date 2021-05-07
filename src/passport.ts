import passport from "passport";
import { Strategy } from "passport-local";
import { Error } from "./validators/base";

import db from "./db";
import UserModel from "./models/user";

const repo = db.getRepository(UserModel);

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

declare module "passport-local" {
  interface IVerifyOptions extends Error {}
}

passport.use(new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (username, password, done) => {
    const user = await repo.findOne({ where: { email: username } });
    if (!user) {
      const error = {
        status: 401,
        message: "Login failed",
        issues: [{ field: "email", message: "not found" }]
      };
      return done(null, false, error);
    }
    const valid = await user.validPassword(password);
    if (!valid) {
      const error = {
        status: 401,
        message: "Login failed",
        issues: [{ field: "password", message: "incorrect" }]
      };
      return done(null, false, error);
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id : string, done) => {
  const user = await repo.findOne({ where: { id } });
  if (user) {
    done(null, user);
  } else {
    done("User not found", null);
  }
});

export default passport;
