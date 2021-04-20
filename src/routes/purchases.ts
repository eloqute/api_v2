import { Router } from "express";

const router = Router();

router.post("/", async (_req, res) => res.status(200).send({
  userId: "aaadcde9-d877-436a-b66b-19acd31d2574",
  publicationId: "aaadcde9-d877-436a-b66b-19acd31d2574"
}));

export default router;
