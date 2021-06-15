import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../../utils";
import Book from "../../models/book";
import ContentItem from "../../models/contentItem";
import BookRepository from "../../repositories/book";
import ContentRepository from "../../repositories/content";
import ContentStructureRepository from "../../repositories/contentStructure";
import signedInPolicy from "../../policies/signedIn";
import ContentStructure from "../../models/contentStructure";

const router = Router();

const bookAndStructureFinder = async (params : ParamsDictionary) => {
  const book = await BookRepository.findByPublicationURL(params.publicationURL);
  const contentStructure = await ContentStructureRepository.findContentStructure(
    params.sectionPosition,
    params.modulePosition,
    params.contentType
  );
  return (book && contentStructure) ? { book, contentStructure } : undefined;
};

type BookAndStructure = { book : Book, contentStructure: ContentStructure };

router.use(
  "/:publicationURL/content/:sectionPosition/:modulePosition/:contentType",
  loadAndAuthorizeResource(signedInPolicy, bookAndStructureFinder),
  async (req : ResourcefulRequest<BookAndStructure>, res) => {
    const { book, contentStructure } = req.resource!;
    const content = await ContentRepository.findContentItems(
      book, contentStructure
    );
    return res.status(200).send(content.map((ci : ContentItem) => ci.asResponse()));
  }
);

export default router;
