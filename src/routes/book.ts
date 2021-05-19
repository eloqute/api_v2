import { Router } from "express";

import { guard404 } from "../utils";
import BookRepository from "../repositories/book";

const router = Router();

router.get("/:isbn/overview", async (req, res) => {
  const maybeBook = await BookRepository.findByISBN(req.params.isbn);
  return guard404(maybeBook, res,
    (book) => res.status(200).send(book.asResponse()));
});

router.get("/byUrl/:publicationURL", async (req, res) => {
  const maybeBook = await BookRepository.findByPublicationURL(req.params.publicationURL);
  return guard404(maybeBook, res, (book) => {
    const location = `/book/${book.ISBN}/overview`;
    return res.status(301).header("Location", location).send(
      { status: 301, location }
    );
  });
});

export default router;
