import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../../utils";
import Book from "../../models/book";
import BookRepository from "../../repositories/book";
import openPolicy from "../../policies/open";

const router = Router();

const bookFinder = (params : ParamsDictionary) => (
  BookRepository.findByPublicationURL(params.publicationURL)
);

router.use(
  "/:publicationURL/overview",
  loadAndAuthorizeResource(openPolicy, bookFinder),
  async (req : ResourcefulRequest<Book>, res) => (
    res.status(200).send(req.resource!.asResponse())
  )
);

export default router;
