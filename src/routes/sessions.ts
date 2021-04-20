import { Router } from "express";

const router = Router();

router.post("/", async (_req, res) => res.status(200).send({
  id: "aaadcde9-d877-436a-b66b-19acd31d2574",
  email: "user@example.com",
  role: {
    name: "user"
  }
}));

export default router;
