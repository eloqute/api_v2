import request, { SuperTest, Test } from "supertest";
import session from "supertest-session";
import jestOpenAPI from "jest-openapi";
import path from "path";
import app from "../../../src/app";
import { setup, teardown } from "../../helpers/db";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("/books resources", () => {
  beforeAll(setup);
  afterAll(teardown);

  describe("GET /book/byUrl/{publicationURL}", () => {
    describe("when a book exists with the given publication URL", () => {
      it("redirects to the overview of the book", async () => {
        const res = await request(app).get("/book/byUrl/phenomenology-of-spirit-analysis").send();
        expect(res.status).toEqual(301);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Redirect");
        expect(res.body.location).toEqual("/book/9781912127184/overview");
      });
    });

    describe("when a book does not exist with the given publication URL", () => {
      it("returns a 404 error", async () => {
        const res = await request(app).get("/book/byUrl/doesnt-exist").send();
        expect(res.status).toEqual(404);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Error");
      });
    });
  });

  describe("GET /book/{isbn}/overview", () => {
    describe("when a book exists with the given ISBN", () => {
      it("returns the details of the book", async () => {
        const res = await request(app).get("/book/9781912127184/overview").send();
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("BookOverview");
        expect(res.body.authors.length).toBeGreaterThan(0);
        res.body.authors.forEach(
          (author : object) => expect(author).toSatisfySchemaInApiSpec("Author")
        );
      });
    });

    describe("when a book does not exist with the given ISBN", () => {
      it("returns a 404 error", async () => {
        const res = await request(app).get("/book/1234567890234/overview").send();
        expect(res.status).toEqual(404);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Error");
      });
    });
  });

  describe("GET /book/{isbn}/content/{sectionNumber}/{moduleNumber}/{contentType}", () => {
    describe("When no user is logged in", () => {
      it("returns a 404 error", async () => {
        const res = await request(app).get("/book/9781912127184/content/0/0/KeyPoints").send();
        expect(res.status).toEqual(401);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Error");
      });
    });

    describe("When a user is logged in", () => {
      let ses : SuperTest<Test> | null = null;

      beforeEach(async () => {
        ses = session(app);
        await ses!.post("/users").send({
          email: "test@example.com",
          password: "password123",
          passwordConfirmation: "password123"
        });
        await ses!.post("/sess").send({
          email: "test@example.com",
          password: "password123"
        });
      });

      describe("When a book exists with the given ISBN", () => {
        it("returns the contents of the given section", async () => {
          const res = await ses!.get("/book/9781912127184/content/0/0/KeyPoints").send();
          expect(res.status).toEqual(200);
          expect(res).toSatisfyApiSpec();
          expect(res.body.length).toBeGreaterThan(0);
          res.body.forEach(
            (item : object) => expect(item).toSatisfySchemaInApiSpec("ContentItem")
          );
        });
      });

      describe("When no book exists with the given ISBN", () => {
        it("returns a 404 error", async () => {
          const res = await ses!.get("/book/987543212356/content/0/0/KeyPoints").send();
          expect(res.status).toEqual(404);
          expect(res).toSatisfyApiSpec();
          expect(res.body).toSatisfySchemaInApiSpec("Error");
        });
      });
    });
  });
});
