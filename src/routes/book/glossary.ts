import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../../utils";
import Book from "../../models/book";
import GlossaryItem from "../../models/glossaryItem";
import BookRepository from "../../repositories/book";
import signedInPolicy from "../../policies/signedIn";

const router = Router();

const bookFinder = ({ params } : { params : ParamsDictionary }) => (
  BookRepository.findByPublicationURL(params.publicationURL)
);

router.use(
  "/:publicationURL/glossary",
  loadAndAuthorizeResource(signedInPolicy, bookFinder),
  async (req : ResourcefulRequest<Book>, res) => {
    const book = req.resource!;
    return res.status(200).send(book.glossary.map((gi : GlossaryItem) => gi.asResponse()));
  }
);

export default router;
