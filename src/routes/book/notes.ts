import { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import loadAndAuthorizeResource from "../../middleware/loadAndAuthorizeResource";
import { ResourcefulRequest } from "../../utils";
import Book from "../../models/book";
import Note from "../../models/note";
import ModuleStructure from "../../models/moduleStructure";
import BookRepository from "../../repositories/book";
import ContentRepository from "../../repositories/content";
import ContentStructureRepository from "../../repositories/contentStructure";
import signedInPolicy from "../../policies/signedIn";

const router = Router();

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

export default router;
