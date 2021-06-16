import request, { SuperTest, Test } from "supertest";
import session from "supertest-session";
import jestOpenAPI from "jest-openapi";
import path from "path";

import app from "../../../src/app";
import { setup, teardown } from "../../helpers/db";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("/session", () => {
  beforeAll(setup);
  afterAll(teardown);

  beforeEach(async () => {
    await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
      passwordConfirmation: "password123"
    });
  });

  describe("POST /session", () => {
    describe("When the email exists and the password is correct", () => {
      it("logs the user in and returns the user object", async () => {
        const ses = session(app);

        const res = await ses.post("/session").send({
          email: "test@example.com",
          password: "password123"
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

    describe("When the email exists and the password is incorrect", () => {
      it("does not log the user in and returns an error", async () => {
        const ses = session(app);

        const res = await ses.post("/session").send({
          email: "test@example.com",
          password: "contrasenya123"
        });
        expect(res.status).toEqual(401);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("ValidationError");

        const res2 = await ses.get("/session").send();
        expect(res2.status).toEqual(404);
        expect(res2.body).toSatisfySchemaInApiSpec("Error");
      });
    });

    describe("When the email does not exist", () => {
      it("does not sign the user in and returns an error", async () => {
        const ses = session(app);

        const res = await ses.post("/session").send({
          email: "noone@example.com",
          password: "password123"
        });
        expect(res.status).toEqual(401);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("ValidationError");

        const res2 = await ses.get("/session").send();
        expect(res2.status).toEqual(404);
        expect(res2.body).toSatisfySchemaInApiSpec("Error");
      });
    });
  });

  describe("GET /session", () => {
    describe("When there is no active user session", () => {
      it("returns a 404 error", async () => {
        const res = await request(app).get("/session").send();
        expect(res.status).toEqual(404);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Error");
      });
    });

    describe("When there is an active user session", () => {
      let ses : SuperTest<Test> | null = null;

      beforeEach(async () => {
        ses = session(app);
        return ses!.post("/session").send({
          email: "test@example.com",
          password: "password123"
        });
      });

      it("returns the user details", async () => {
        const res = await ses!.get("/session").send();
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("User");
      });
    });
  });

  describe("DELETE /session", () => {
    describe("When there is no active user session", () => {
      it("returns a 404 error", async () => {
        const res = await request(app).delete("/session").send();
        expect(res.status).toEqual(404);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Error");
      });
    });

    describe("When there is an active user session", () => {
      let ses : SuperTest<Test> | null = null;

      beforeEach(async () => {
        ses = session(app);
        return ses!.post("/session").send({
          email: "test@example.com",
          password: "password123"
        });
      });

      it("returns the user details", async () => {
        const res = await ses!.delete("/session").send();
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
        expect(res.body).toSatisfySchemaInApiSpec("Message");
      });
    });
  });
});
