import "../db";
import Book from "../models/book";
import Note from "../models/note";
import ContentItem from "../models/contentItem";
import ContentStructure from "../models/contentStructure";
import ModuleStructure from "../models/moduleStructure";
import SectionStructure from "../models/sectionStructure";

export default {
  findContentItems: (
    book : Book, contentStructure : ContentStructure
  ) => ContentItem.findAll({
    include: [
      Book,
      {
        model: ContentStructure,
        include: [
          {
            model: ModuleStructure,
            include: [SectionStructure]
          }
        ]
      }
    ],
    where: {
      bookId: book.id,
      contentStructureId: contentStructure.id
    },
    order: ["position"]
  }),

  findNotes: (
    book : Book, moduleStructure : ModuleStructure
  ) => Note.findAll({
    include: [
      Book,
      {
        model: ModuleStructure,
        include: [SectionStructure]
      }
    ],
    where: {
      bookId: book.id,
      moduleId: moduleStructure.id
    },
    order: ["position"]
  })
};
