import {
  Table, Column, Model, ForeignKey, DataType, BelongsTo
} from "sequelize-typescript";

import Book from "./book";
import ContentStructure from "./contentStructure";

@Table({ timestamps: true })
export default class ContentItem extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @ForeignKey(() => Book)
  @Column
  bookId!: number

  @ForeignKey(() => ContentStructure)
  @Column
  contentStructureId! : number

  @BelongsTo(() => Book)
  book! : Book

  @BelongsTo(() => ContentStructure)
  contentStructure! : ContentStructure

  @Column
  position! : number

  @Column({ type: DataType.TEXT })
  content! : string

  asResponse() {
    return {
      ISBN: this.book.ISBN,
      section: this.contentStructure.module.section.position,
      module: this.contentStructure.module.position,
      position: this.position,
      contentType: this.contentStructure.contentType,
      content: this.content
    };
  }
}
