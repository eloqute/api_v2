import BookAuthor from "../models/bookAuthor";

import authorSummary from "./authorSummary";

export default function serializer(bookAuthor : BookAuthor) : object {
  return {
    ...bookAuthor.author.asResponse(authorSummary),
    ...{
      position: bookAuthor.position,
      isTopicAuthor: bookAuthor.isTopicAuthor
    }
  };
}
