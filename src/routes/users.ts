import { Router } from "express";

import User from "../models/user";
import Validator from "../validators/userCreate";
import db from "../db";

const router = Router();
const repo = db.getRepository(User);

router.post("/", async (req, res) => {
  const validator = new Validator(
    async (email : string) => repo.findOne({ where: { email } })
  );
  const result = await validator.validate(req.body);
  if (result.kind === "success") {
    const { email, password } = result.params;
    const user = await repo.create({ email, password });
    return res.status(201).send(user.asResponse());
  }
  return res.status(result.error.status).send(result.error);
});

export default router;
