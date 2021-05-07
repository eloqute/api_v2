import { Router } from "express";

import passport from "../passport";
import db from "../db";
import User from "../models/user";

const router = Router();
const repo = db.getRepository(User);

router.post("/",
  passport.authenticate("local"),
  async (req, res) => {
    const { email } = req.body;
    const user = await repo.findOne({ where: { email } });
    return res.status(201).send(user?.asResponse());
  });

router.get("/test", async (req, res) => {
  res.status(200).send(req.user?.asResponse());
});

export default router;
