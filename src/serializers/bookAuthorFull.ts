import BookAuthor from "../models/bookAuthor";

export default function serializer(bookAuthor : BookAuthor) : object {
  return {
    ...bookAuthor.author.asResponse(),
    ...{
      position: bookAuthor.position,
      isTopicAuthor: bookAuthor.isTopicAuthor
    }
  };
}
