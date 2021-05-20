declare module "supertest-session" {
  import * as supertest from "supertest";

  declare function supertestSession(app: any): supertest.SuperTest<supertest.Test>;
  export = supertestSession;
}
