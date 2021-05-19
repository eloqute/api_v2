import "../db";
import Book from "../models/book";
import BookAuthor from "../models/bookAuthor";
import Author from "../models/author";

export default {
  findByISBN: async (ISBN : string) => (
    Book.findOne({
      where: { ISBN },
      include: [{
        model: BookAuthor,
        include: [{
          model: Author
        }]
      }],
      order: [
        [{ model: BookAuthor, as: "bookAuthors" }, "position", "ASC"]
      ]
    })
  ),

  findByPublicationURL: async (publicationURL : string) => (
    Book.findOne({ where: { publicationURL } })
  )
};
