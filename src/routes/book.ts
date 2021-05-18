import { Router } from "express";

import BookRepository from "../repositories/book";

const router = Router();

router.get("/:publicationURL", async (req, res) => {
  const book = await BookRepository.findByPublicationURL(req.params.publicationURL);
  if (book) {
    return res.status(200).send(book.asResponse());
  }
  return res.status(404).send({ status: 404, message: "Not found." });
});

export default router;
