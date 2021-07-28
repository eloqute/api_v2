import Book from "../models/book";

export default function serializer(book : Book) : object {
  return {
    id: book.id,
    publicationURL: book.publicationURL,
    title: book.title,
    ISBN: book.ISBN,
    authors: book.bookAuthors.map((ba) => ba.asResponse())
  };
}
