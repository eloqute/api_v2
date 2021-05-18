import "../db";
import Book from "../models/book";

export default {
  findByPublicationURL: async (publicationURL : string) => (
    Book.findOne({ where: { publicationURL } })
  )
};
