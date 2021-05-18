import request from "supertest";
import jestOpenAPI from "jest-openapi";
import path from "path";
import app from "../../../src/app";
import { setup, teardown } from "../../helpers/db";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("GET /book/{publicationURL}", () => {
  beforeAll(setup);
  afterAll(teardown);

  describe("when a book exists with the given publication URL", () => {
    it("returns the details of the book", async () => {
      const res = await request(app).get("/book/phenomenology-of-spirit-analysis").send();
      expect(res.status).toEqual(200);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("Book");
    });
  });

  describe("when a book does not exist with the given publication URL", () => {
    it("returns the details of the book", async () => {
      const res = await request(app).get("/book/doesnt-exist").send();
      expect(res.status).toEqual(404);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("Error");
    });
  });
});
