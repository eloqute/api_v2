import {
  Table, Column, Model, HasMany, ForeignKey, BelongsTo, DataType
} from "sequelize-typescript";

import ContentStructure from "./contentStructure";
import SectionStructure from "./sectionStructure";

@Table({ timestamps: true })
export default class ModuleStructure extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @ForeignKey(() => SectionStructure)
  @Column
  sectionId! : string

  @BelongsTo(() => SectionStructure)
  section! : SectionStructure

  @Column
  position! : number

  @Column
  title! : string

  @HasMany(() => ContentStructure)
  contents!: ContentStructure[]

  asResponse() {
    return {
      title: this.title,
      content: this.contents.map((c) => c.asResponse())
    };
  }
}
