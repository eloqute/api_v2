import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../../utils";
import Book from "../../models/book";
import BibliographyItem from "../../models/bibliographyItem";
import BookRepository from "../../repositories/book";
import signedInPolicy from "../../policies/signedIn";

const router = Router();

const bookFinder = (params : ParamsDictionary) => (
  BookRepository.findByPublicationURL(params.publicationURL)
);

router.use(
  "/:publicationURL/bibliography",
  loadAndAuthorizeResource(signedInPolicy, bookFinder),
  async (req : ResourcefulRequest<Book>, res) => {
    const book = req.resource!;
    return res.status(200).send(book.bibliography.map((bi: BibliographyItem) => bi.asResponse()));
  }
);

export default router;
