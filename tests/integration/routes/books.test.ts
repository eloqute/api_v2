import request from "supertest";
import jestOpenAPI from "jest-openapi";
import path from "path";
import app from "../../../src/app";
import { setup, teardown } from "../../helpers/db";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("GET /books", () => {
  beforeAll(setup);
  afterAll(teardown);

  it("returns the list of books", async () => {
    const res = await request(app).get("/books").send();
    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(
      (book : object) => expect(book).toSatisfySchemaInApiSpec("BookOverview")
    );
  });
});
