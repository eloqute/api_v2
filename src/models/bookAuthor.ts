import {
  Table, Column, Model, ForeignKey, BelongsTo
} from "sequelize-typescript";

import Book from "./book";
import Author from "./author";

@Table({ timestamps: false })
export default class BookAuthor extends Model {
  @ForeignKey(() => Book)
  @Column
  bookId!: string

  @ForeignKey(() => Author)
  @Column
  authorId! : string

  @BelongsTo(() => Author)
  author! : Author

  @Column
  position! : number

  @Column
  isTopicAuthor! : boolean

  asResponse() {
    return {
      ...this.author.asResponse(),
      ...{
        position: this.position,
        isTopicAuthor: this.isTopicAuthor
      }
    };
  }
}
