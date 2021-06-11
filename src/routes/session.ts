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

router.get("/", async (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user.asResponse());
  }
  return res.status(404).send({
    status: 404,
    message: "Not found."
  });
});

router.delete("/", async (req, res) => {
  if (req.user) {
    req.logout();
    return res.status(200).send({
      status: 200,
      message: "Session ended."
    });
  }
  return res.status(404).send({
    status: 404,
    message: "Not found."
  });
});

export default router;
