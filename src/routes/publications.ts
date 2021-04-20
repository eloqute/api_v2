import { Router } from "express";

var router = Router();

router.get("/", async (_req, res) => {
  res.status(200).send([
    {
      "id": "aaadcde9-d877-436a-b66b-19acd31d2574",
      "title": "Purity & Danger",
      "author": "Mary Douglas"
    }
  ]);
});

router.get("/:publicationId/content", async (_req, res) => {
  res.status(200).send({
    "id": "aaadcde9-d877-436a-b66b-19acd31d2574",
    "title": "Purity & Danger",
    "author": "Mary Douglas",
    "content": "The content which is only available to paid users"
  });
});

export default router;
