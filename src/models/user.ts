import {
  Table, Column, Model, DataType
} from "sequelize-typescript";

@Table({ timestamps: true })
export default class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : String

  @Column
  email! : String

  @Column
  passwordHash! : String

  asResponse() {
    return {
      id: this.id,
      email: this.email
    };
  }
}
