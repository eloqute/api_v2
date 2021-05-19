import {
  Table, Column, Model, BelongsToMany, DataType
} from "sequelize-typescript";

import Book from "./book";
import BookAuthor from "./bookAuthor";

@Table({ timestamps: true })
export default class Author extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @BelongsToMany(() => Book, () => BookAuthor)
  books! : Book[]

  @Column
  name! : string

  @Column({ type: DataType.TEXT })
  biography! : string

  @Column
  isAlive! : boolean

  asResponse() {
    return {
      id: this.id,
      name: this.name,
      biography: this.biography,
      isAlive: this.isAlive
    };
  }
}
