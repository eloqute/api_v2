import "../db";
import Book from "../models/book";
import ContentItem from "../models/contentItem";
import ContentStructure from "../models/contentStructure";
import ModuleStructure from "../models/moduleStructure";
import SectionStructure from "../models/sectionStructure";

export default {
  findByISBNAndPath: (
    ISBN : string, sectionPosition : string,
    modulePosition : string, contentType : string
  ) => ContentItem.findAll({
    include: [
      {
        model: Book,
        where: { ISBN }
      },
      {
        model: ContentStructure,
        include: [{
          model: ModuleStructure,
          where: { position: modulePosition },
          include: [{
            model: SectionStructure,
            where: { position: sectionPosition }
          }]
        }],
        where: { contentType }
      }
    ],
    order: ["position"]
  })
};