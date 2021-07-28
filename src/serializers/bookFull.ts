import Book from "../models/book";

export default function serializer(book : Book) {
  return {
    id: book.id,
    publicationURL: book.publicationURL,
    title: book.title,
    ISBN: book.ISBN,
    synopsis: book.synopsis,
    overview: book.overview,
    authors: book.bookAuthors.map((ba) => ba.asResponse())
  };
}
