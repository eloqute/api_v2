import { Router } from "express";
import bcrypt from "bcrypt";

import User from "../models/user";
import Validator from "../validators/user";
import db from "../db";

const router = Router();
const repo = db.getRepository(User);

router.post("/", async (req, res) => {
  const validator = await Validator.validate(req.body);
  if (validator.isValid()) {
    const { email, password } = validator.validParams() ?? {};
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await repo.create({ email, passwordHash });
    return res.status(201).send(user.asResponse());
  }
  return res.status(422).send(validator.errorResponse());
});

export default router;
