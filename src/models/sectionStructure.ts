import {
  Table, Column, Model, HasMany, DataType
} from "sequelize-typescript";

import ModuleStructure from "./moduleStructure";

@Table({ timestamps: true })
export default class SectionStructure extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @Column
  position! : number

  @Column
  title! : string

  @HasMany(() => ModuleStructure)
  modules!: ModuleStructure[]

  asResponse() {
    return {
      title: this.title,
      modules: this.modules.map((m) => m.asResponse())
    };
  }
}
