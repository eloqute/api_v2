import { asyncReduce } from "../utils";

export type Issue = {
  field : string,
  message : string
}

export type Error = {
  status : number,
  message : string,
  issues: Issue[]
}

export type Failure = {
  kind: "failure",
  error: Error
}

export type Success<T> = {
  kind: "success",
  params : T
}

type ResultType<T> = Success<T> | Failure;

type ValidatorFunction<T> = (_ : T) => Promise<Issue | undefined>

export default abstract class BaseValidator<T> {
  errorMessage : string;

  errorStatus : number;

  validations: ValidatorFunction<T>[];

  constructor(
    validations: ValidatorFunction<T>[],
    errorMessage = "the parameters provided failed validation",
    errorStatus = 422
  ) {
    this.errorMessage = errorMessage;
    this.errorStatus = errorStatus;
    this.validations = validations;
  }

  async validate(params : T) : Promise<ResultType<T>> {
    const callback = async (
      issues : Issue[],
      validation : ValidatorFunction<T>
    ) => {
      const result = await validation(params);
      return result ? [...issues, result] : issues;
    };

    const issues = await asyncReduce(this.validations, callback, []);

    if (issues.length > 0) {
      return {
        kind: "failure",
        error: {
          status: this.errorStatus,
          message: this.errorMessage,
          issues
        }
      };
    }
    return { params, kind: "success" };
  }
}
