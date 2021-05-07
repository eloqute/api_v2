import passport from "passport";
import { Strategy } from "passport-local";

import db from "./db";
import UserModel from "./models/user";

const repo = db.getRepository(UserModel);

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

passport.use(new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (username, password, done) => {
    const user = await repo.findOne({ where: { email: username } });
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    const valid = await user.validPassword(password);
    if (!valid) {
      return done(null, false, { message: "Incorrect password." });
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
