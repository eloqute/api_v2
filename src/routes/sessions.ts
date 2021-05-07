import { Router } from "express";

import passport from "../passport";

const router = Router();

router.post("/", async (req, res) => passport.authenticate(
  "local", async (_err, user, info) => {
    if (user) {
      return res.status(201).send(user.asResponse());
    }
    return res.status(info.status).send(info);
  }
)(req, res));

router.get("/test", async (req, res) => {
  res.status(200).send(req.user?.asResponse());
});

export default router;
