import { Router } from "express";

import { loadAndAuthorizeResource, ResourcefulRequest } from "../../utils";
import Book from "../../models/book";
import BookRepository from "../../repositories/book";
import openPolicy from "../../policies/open";

const router = Router({ mergeParams: true });

loadAndAuthorizeResource(router, openPolicy, (params) =>
  BookRepository.findByPublicationURL(params.publicationURL)
)

router.get("/", async (req : ResourcefulRequest<Book>, res) => {
  res.status(200).send(req.resource!.asResponse())
});

export default router;
