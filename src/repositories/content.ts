import "../db";
import Book from "../models/book";
import ContentItem from "../models/contentItem";
import ContentStructure from "../models/contentStructure";
import ModuleStructure from "../models/moduleStructure";
import SectionStructure from "../models/sectionStructure";

export default {
  findByBookAndContentStructure: (
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
  })
};
