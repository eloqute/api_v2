import { Router } from "express";

import { guard404, guard401 } from "../utils";
import BookRepository from "../repositories/book";
import ContentRepository from "../repositories/content";
import ContentItem from "../models/contentItem";

const router = Router();

router.get("/:publicationURL/overview", async (req, res) => {
  const maybeBook = await BookRepository.findByPublicationURL(req.params.publicationURL);
  return guard404(
    maybeBook, res,
    async (book) => res.status(200).send(book.asResponse())
  );
});

router.get("/:publicationURL/content/:sectionPosition/:modulePosition/:contentType", async (req, res) => guard401(req.user, res, async (_user) => {
  const {
    publicationURL, sectionPosition, modulePosition, contentType
  } = req.params;
  const maybeBook = await BookRepository.findByPublicationURL(publicationURL);
  const content = await ContentRepository.findByPublicationURLAndPath(
    publicationURL, sectionPosition, modulePosition, contentType
  );
  return guard404(
    maybeBook, res,
    async (_book) => res.status(200).send(
      content.map((ci : ContentItem) => ci.asResponse())
    )
  );
}));

export default router;
