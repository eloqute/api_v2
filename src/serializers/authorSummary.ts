import Author from "../models/author";

export default function serializer(author : Author) : object {
  return {
    id: author.id,
    name: author.name
  };
}
