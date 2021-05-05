import { Router } from "express";

import User from "../models/user";
import Validator from "../validators/user";
import db from "../db";

const router = Router();
const repo = db.getRepository(User);

router.post("/", async (req, res) => {
  const validator = await Validator.validate(req.body);
  if (validator.isValid()) {
    const { email, password } = validator.validParams() ?? {};
    const user = await repo.create({ email, password });
    return res.status(201).send(user.asResponse());
  }
  return res.status(422).send(validator.errorResponse());
});

export default router;
