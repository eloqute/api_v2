import {
  Table, Column, Model, ForeignKey, DataType, BelongsTo
} from "sequelize-typescript";

import Book from "./book";

@Table({ timestamps: true })
export default class BibliographyItem extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @ForeignKey(() => Book)
  @Column
  bookId!: string

  @BelongsTo(() => Book)
  book! : Book

  @Column
  position! : number

  @Column({ type: DataType.TEXT })
  publication! : string

  @Column({ type: DataType.TEXT })
  content! : string

  asResponse() {
    return {
      position: this.position,
      publication: this.publication,
      content: this.content
    };
  }
}
