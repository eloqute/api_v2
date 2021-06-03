import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../utils";

import Book from "../models/book";
import ContentItem from "../models/contentItem";

import BookRepository from "../repositories/book";
import ContentRepository from "../repositories/content";

import signedInPolicy from "../policies/signedIn";
import openPolicy from "../policies/open";

const router = Router();

const bookFinder = (params : ParamsDictionary) => (
  BookRepository.findByPublicationURL(params.publicationURL)
);

router.use(
  "/:publicationURL/overview",
  loadAndAuthorizeResource(openPolicy, bookFinder),
  async (req : ResourcefulRequest<Book>, res) => {
    res.status(200).send(req.resource!.asResponse());
  }
);

router.use(
  "/:publicationURL/content/:sectionPosition/:modulePosition/:contentType",
  loadAndAuthorizeResource(signedInPolicy, bookFinder),
  async (req, res) => {
    const {
      publicationURL, sectionPosition, modulePosition, contentType
    } = req.params;
    const content = await ContentRepository.findByPublicationURLAndPath(
      publicationURL, sectionPosition, modulePosition, contentType
    );
    res.status(200).send(content.map((ci : ContentItem) => ci.asResponse()));
  }
);

export default router;
