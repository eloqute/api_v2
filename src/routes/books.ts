import { Router } from "express";

import loadAndAuthorizeResource from "../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest, maybeParseInt } from "../utils";
import Book from "../models/book";
import BookRepository from "../repositories/book";
import openPolicy from "../policies/open";
import summarySerializer from "../serializers/bookSummary";

const router = Router();

router.use(
  "/",
  loadAndAuthorizeResource(
    openPolicy,
    ({ query }) => BookRepository.findAll(
      maybeParseInt(query.page),
      maybeParseInt(query.perPage)
    )
  ),
  async (req : ResourcefulRequest<Book[]>, res) => (
    res.status(200).send(req.resource!.map((book) => book.asResponse(summarySerializer)))
  )
);

export default router;
