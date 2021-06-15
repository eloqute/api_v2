import {
  Table, Column, Model, ForeignKey, DataType, BelongsTo
} from "sequelize-typescript";

import Book from "./book";

@Table({ timestamps: true })
export default class GlossaryItem extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @ForeignKey(() => Book)
  @Column
  bookId!: string

  @BelongsTo(() => Book)
  book! : Book

  @Column
  position! : number

  @Column
  type! : string

  @Column
  textIdentifier! : string

  @Column({ type: DataType.TEXT })
  label! : string

  @Column({ type: DataType.TEXT })
  synopsis! : string

  asResponse() {
    return {
      position: this.position,
      type: this.type,
      textIdentifier: this.textIdentifier,
      label: this.label,
      synopsis: this.synopsis
    };
  }
}
