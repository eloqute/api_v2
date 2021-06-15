import request, { SuperTest, Test } from "supertest";
import session from "supertest-session";
import jestOpenAPI from "jest-openapi";
import path from "path";
import app from "../../../../src/app";
import { setup, teardown } from "../../../helpers/db";

jestOpenAPI(path.join(__dirname, "../../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("GET /book/{publicationURL}/content/{sectionNumber}/{moduleNumber}/Notes", () => {
  beforeAll(setup);
  afterAll(teardown);

  describe("When no user is logged in", () => {
    it("returns a 401 error", async () => {
      const res = await request(app).get("/book/phenomenology-of-spirit-analysis/content/1/0/Notes").send();
      expect(res.status).toEqual(401);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("Error");
    });
  });

  describe("When a user is logged in", () => {
    let ses : SuperTest<Test> | null = null;

    beforeAll(async () => {
      ses = session(app);
      await ses!.post("/users").send({
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "password123"
      });
      await ses!.post("/session").send({
        email: "test@example.com",
        password: "password123"
      });
    });

    describe("When a book exists with the given Publication URL", () => {
      it("returns the notes for the given module", async () => {
        const res = await ses!.get("/book/phenomenology-of-spirit-analysis/content/1/0/Notes").send();
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach(
          (item : object) => expect(item).toSatisfySchemaInApiSpec("Note")
        );
      });
    });

    describe("When no book exists with the given Publiaction URL", () => {
      it("returns a 404 error", async () => {
        const res = await ses!.get("/book/doesnt-exist/content/1/0/Notes").send();
        expect(res.status).toEqual(404);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Error");
      });
    });
  });
});
