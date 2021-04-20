
import { Router } from "express";

var router = Router();

router.post("/", async (_req, res) => {
  res.status(200).send({
    "user_id": "aaadcde9-d877-436a-b66b-19acd31d2574",
    "publication_id": "aaadcde9-d877-436a-b66b-19acd31d2574"
  });
});

export default router;
