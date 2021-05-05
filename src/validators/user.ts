import db from "../db";
import User from "../models/user";

const repo = db.getRepository(User);

type Failure = {
  field : string,
  message : string
}

type Error = {
  status : number
  message : string
  failures: [Failure]
}

type ParamType = {
  email : string
  password: string
  passwordConfirmation: string
}

export default class UserValidator {
  private params : ParamType;

  private error? : Error;

  static async validate(params : ParamType) {
    const validator = new UserValidator(params);
    await validator.validate();
    return validator;
  }

  constructor(params : ParamType) {
    this.params = params;
  }

  async validate() {
    await this.validatePasswordsMatch();
    await this.validateUserDoesntExist();
  }

  async validateUserDoesntExist() {
    const existing = await repo.findOne({ where: { email: this.params.email } });
    if (existing) {
      this.error = {
        status: 422,
        message: "the parameters provided failed validation",
        failures: [{
          field: "email",
          message: "is already associated with an existing account"
        }]
      };
    }
  }

  async validatePasswordsMatch() {
    if (this.params.password !== this.params.passwordConfirmation) {
      this.error = {
        status: 422,
        message: "the parameters provided failed validation",
        failures: [{
          field: "passwordConfirmation",
          message: "does not match given password"
        }]
      };
    }
  }

  isValid() : boolean {
    return !this.error;
  }

  validParams() : ParamType | undefined {
    return this.isValid() ? this.params : undefined;
  }

  errorResponse() : Error | undefined {
    return this.isValid() ? undefined : this.error;
  }
}
