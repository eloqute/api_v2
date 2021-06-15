import {
  Table, Column, Model, ForeignKey, DataType, BelongsTo
} from "sequelize-typescript";

import Book from "./book";
import ModuleStructure from "./moduleStructure";

@Table({ timestamps: true })
export default class Note extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @ForeignKey(() => Book)
  @Column
  bookId!: string

  @ForeignKey(() => ModuleStructure)
  @Column
  moduleId! : string

  @BelongsTo(() => Book)
  book! : Book

  @BelongsTo(() => ModuleStructure)
  module! : ModuleStructure

  @Column
  position! : number

  @Column
  textIdentifier! : string

  @Column({ type: DataType.TEXT })
  content! : string

  asResponse() {
    return {
      ISBN: this.book.ISBN,
      section: this.module.section.position,
      module: this.module.position,
      position: this.position,
      textIdentifier: this.textIdentifier,
      content: this.content
    };
  }
}
