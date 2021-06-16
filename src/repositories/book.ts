import "../db";
import Book from "../models/book";
import BookAuthor from "../models/bookAuthor";
import BibliographyItem from "../models/bibliographyItem";
import GlossaryItem from "../models/glossaryItem";
import Author from "../models/author";

export default {
  findAll: () => (
    Book.findAll({
      include: [{
        model: BookAuthor,
        include: [{
          model: Author
        }]
      }]
    })
  ),

  findByPublicationURL: async (publicationURL : string) => (
    Book.findOne({
      where: { publicationURL },
      include: [
        {
          model: BookAuthor,
          include: [{
            model: Author
          }]
        },
        BibliographyItem,
        GlossaryItem
      ],
      order: [
        [{ model: BookAuthor, as: "bookAuthors" }, "position", "ASC"],
        [{ model: BibliographyItem, as: "bibliography" }, "position", "ASC"],
        [{ model: GlossaryItem, as: "glossary" }, "position", "ASC"]
      ]
    })
  )
};
