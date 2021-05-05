import bcrypt from "bcrypt";
import {
  Table, Column, Model, BeforeSave, DataType
} from "sequelize-typescript";

@Table({ timestamps: true })
export default class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : String

  @Column
  email! : String

  @Column
  passwordHash! : String

  @Column(DataType.VIRTUAL)
  password! : String

  asResponse() {
    return {
      id: this.id,
      email: this.email
    };
  }

  @BeforeSave
  static async setPassword(instance : User) {
    const user = instance;
    if (user.password) {
      const salt = await bcrypt.genSalt();
      const cryptedPassword = await bcrypt.hash(user.password, salt);
      user.passwordHash = cryptedPassword;
    }
  }
}
