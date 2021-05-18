import {
  Table, Column, Model, ForeignKey, DataType
} from "sequelize-typescript";

import ModuleStructure from "./moduleStructure";

@Table({ timestamps: true })
export default class ContentStructure extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @ForeignKey(() => ModuleStructure)
  @Column
  moduleId! : string

  @Column
  position! : number

  @Column
  contentType! : string

  @Column
  title! : string

  @Column
  outerTag! : string

  @Column
  innerTag! : string

  asResponse() {
    return this.contentType;
  }
}