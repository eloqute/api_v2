import { Router } from "express";

import Validator from "../validators/userCreate";
import UserRepository from "../repositories/user";

const router = Router();

router.post("/", async (req, res) => {
  const validator = new Validator(UserRepository.findByEmail);
  const result = await validator.validate(req.body);
  if (result.kind === "success") {
    const { email, password } = result.params;
    const user = await UserRepository.create({ email, password });
    return res.status(201).send(user.asResponse());
  }
  return res.status(result.error.status).send(result.error);
});

export default router;
