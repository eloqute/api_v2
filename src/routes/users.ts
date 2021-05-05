import { Router } from "express";
import bcrypt from "bcrypt";

import User from "../models/user";
import db from "../db";

const router = Router();
const repo = db.getRepository(User);

router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(req.body.password, salt);
  const { email } = req.body;
  const user = await repo.create({ email, passwordHash });
  return res.status(201).send(user.asResponse());
});

export default router;
