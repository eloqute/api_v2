import bcrypt from "bcrypt";
import {
  Table, Column, Model, BeforeSave, DataType
} from "sequelize-typescript";

@Table({ timestamps: true, tableName: "Users" })
class UserModel extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id! : string

  @Column
  email! : string

  @Column
  passwordHash! : string

  @Column(DataType.VIRTUAL)
  password! : string

  asResponse() {
    return {
      id: this.id,
      email: this.email
    };
  }

  async validPassword(password : string) {
    return bcrypt.compare(password, this.passwordHash);
  }

  @BeforeSave
  static async setPassword(instance : UserModel) {
    const user = instance;
    if (user.password) {
      const salt = await bcrypt.genSalt();
      const cryptedPassword = await bcrypt.hash(user.password, salt);
      user.passwordHash = cryptedPassword;
    }
  }
}

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

export default UserModel;
