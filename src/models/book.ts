import {
  Table, Column, Model, BelongsToMany, DataType, HasMany
} from "sequelize-typescript";

import Author from "./author";
import BookAuthor from "./bookAuthor";
import BibliographyItem from "./bibliographyItem";
import GlossaryItem from "./glossaryItem";
import fullSerializer from "../serializers/bookFull";

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

  @HasMany(() => BibliographyItem)
  bibliography! : BibliographyItem[]

  @HasMany(() => GlossaryItem)
  glossary! : GlossaryItem[]

  asResponse(serializer : ((book : Book) => object) = fullSerializer) {
    return serializer(this);
  }
}
