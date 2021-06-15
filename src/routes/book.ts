import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../utils";

import Book from "../models/book";
import ContentItem from "../models/contentItem";
import Note from "../models/note";

import BookRepository from "../repositories/book";
import ContentRepository from "../repositories/content";
import ContentStructureRepository from "../repositories/contentStructure";

import signedInPolicy from "../policies/signedIn";
import openPolicy from "../policies/open";
import ContentStructure from "../models/contentStructure";
import ModuleStructure from "../models/moduleStructure";

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

const bookAndModuleFinder = async (params : ParamsDictionary) => {
  const book = await BookRepository.findByPublicationURL(params.publicationURL);
  const module = await ContentStructureRepository.findModuleStructure(
    params.sectionPosition, params.modulePosition
  );
  return (book && module) ? { book, module } : undefined;
};

type BookAndModule = { book : Book, module : ModuleStructure };

router.use(
  "/:publicationURL/content/:sectionPosition/:modulePosition/Notes",
  loadAndAuthorizeResource(signedInPolicy, bookAndModuleFinder),
  async (req : ResourcefulRequest<BookAndModule>, res) => {
    const { book, module } = req.resource!;
    const notes = await ContentRepository.findNotes(book, module);
    return res.status(200).send(notes.map((ni : Note) => ni.asResponse()));
  }
);

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
