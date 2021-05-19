import {
  Table, Column, Model, BelongsToMany, DataType, HasMany
} from "sequelize-typescript";

import Author from "./author";
import BookAuthor from "./bookAuthor";

@Table({ timestamps: true })
export default class Book extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @Column
  publicationURL! : string

  @Column
  title! : string

  @Column
  ISBN! : string

  @Column({ type: DataType.TEXT })
  synopsis! : string

  @Column({ type: DataType.TEXT })
  overview! : string

  @BelongsToMany(() => Author, () => BookAuthor)
  authors! : Author[]

  @HasMany(() => BookAuthor)
  bookAuthors! : BookAuthor[]

  asResponse() {
    return {
      id: this.id,
      publicationURL: this.publicationURL,
      title: this.title,
      ISBN: this.ISBN,
      synopsis: this.synopsis,
      overview: this.overview,
      authors: this.bookAuthors.map((ba) => ba.asResponse())
    };
  }
}
