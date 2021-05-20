import { Router } from "express";

import { guard404, guard401 } from "../utils";
import BookRepository from "../repositories/book";
import ContentRepository from "../repositories/content";
import ContentItem from "../models/contentItem";

const router = Router();

router.get("/:isbn/overview", async (req, res) => {
  const maybeBook = await BookRepository.findByISBN(req.params.isbn);
  return guard404(
    maybeBook, res,
    async (book) => res.status(200).send(book.asResponse())
  );
});

router.get("/:isbn/content/:sectionPosition/:modulePosition/:contentType", async (req, res) => guard401(req.user, res, async (_user) => {
  const {
    isbn, sectionPosition, modulePosition, contentType
  } = req.params;
  const maybeContent = await ContentRepository.findByISBNAndPath(
    isbn, sectionPosition, modulePosition, contentType
  );
  return guard404(
    maybeContent, res,
    async (content) => res.status(200).send(
      content.map((ci : ContentItem) => ci.asResponse())
    )
  );
}));

router.get("/byUrl/:publicationURL", async (req, res) => {
  const maybeBook = await BookRepository.findByPublicationURL(req.params.publicationURL);
  return guard404(maybeBook, res, async (book) => {
    const location = `/book/${book.ISBN}/overview`;
    return res.status(301).header("Location", location).send(
      { status: 301, location }
    );
  });
});

export default router;
