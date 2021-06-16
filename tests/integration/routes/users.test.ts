import request from "supertest";
import session from "supertest-session";
import jestOpenAPI from "jest-openapi";
import path from "path";
import app from "../../../src/app";
import { setup, teardown } from "../../helpers/db";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("POST /users", () => {
  beforeAll(setup);
  afterAll(teardown);

  describe("when the email does not already exist and the passwords match", () => {
    it("creates and returns the user object, signing that user in", async () => {
      const ses = session(app);

      const res = await ses.post("/users").send({
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "password123"
      });
      expect(res.headers).toEqual(
        expect.objectContaining({
          "set-cookie": expect.arrayContaining([
            expect.stringMatching(/^connect.sid=/)
          ])
        })
      );
      expect(res.status).toEqual(201);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("User");

      const res2 = await ses.get("/session").send();
      expect(res2.status).toEqual(200);
      expect(res2.body).toSatisfySchemaInApiSpec("User");
    });
  });

  describe("when the email already exists", () => {
    it("Fails with an error message, and does not sign the user in", async () => {
      await request(app).post("/users").send({
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "password123"
      });

      const ses = session(app);

      const res2 = await ses.post("/users").send({
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "password123"
      });
      expect(res2.status).toEqual(422);
      expect(res2).toSatisfyApiSpec();
      expect(res2.body).toSatisfySchemaInApiSpec("ValidationError");

      const res3 = await ses.get("/session").send();
      expect(res3.status).toEqual(404);
      expect(res3.body).toSatisfySchemaInApiSpec("Error");
    });
  });

  describe("when the passwords do not match", () => {
    it("Fails with an error message, and does not log the user in", async () => {
      const ses = session(app);

      const res = await ses.post("/users").send({
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "contraseña123"
      });
      expect(res.status).toEqual(422);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("ValidationError");

      const res2 = await ses.get("/session").send();
      expect(res2.status).toEqual(404);
      expect(res2.body).toSatisfySchemaInApiSpec("Error");
    });
  });
});
