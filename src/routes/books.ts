import { Router } from "express";

import loadAndAuthorizeResource from "../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../utils";
import Book from "../models/book";
import BookRepository from "../repositories/book";
import openPolicy from "../policies/open";

const router = Router();

router.use(
  "/",
  loadAndAuthorizeResource(openPolicy, BookRepository.findAll),
  async (req : ResourcefulRequest<Book[]>, res) => (
    res.status(200).send(req.resource!.map((book) => book.asResponse()))
  )
);

export default router;
