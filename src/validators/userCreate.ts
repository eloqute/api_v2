import User from "../models/user";
import Base from "./base";

type ParamType = {
  email : string,
  password: string,
  passwordConfirmation: string
}

type FinderType = (arg0 : string) => Promise<User | null>

export default class UserCreateValidator extends Base<ParamType> {
  constructor(callback : FinderType) {
    const validateUserDoesntExist = async (params : ParamType) => {
      const existing = await callback(params.email);
      if (existing) {
        return {
          field: "email",
          message: "is already associated with an existing account"
        };
      }
      return undefined;
    };

    const validatePasswordsMatch = async (params : ParamType) => {
      if (params.password !== params.passwordConfirmation) {
        return {
          field: "passwordConfirmation",
          message: "does not match given password"
        };
      }
      return undefined;
    };

    super([validateUserDoesntExist, validatePasswordsMatch]);
  }
}
