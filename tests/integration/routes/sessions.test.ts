import request from "supertest";
import jestOpenAPI from "jest-openapi";
import path from "path";

import app from "../../../src/app";
import db from "../../../src/db";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("POST /sessions", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  beforeEach(async () => {
    await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
      passwordConfirmation: "password123"
    });
  });

  afterAll(async () => {
    await db.close();
  });

  describe("When the email exists and the password is correct", () => {
    it("sets the session cookie and returns the user object", async () => {
      const res = await request(app).post("/sessions").send({
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
    });
  });

  describe("When the email exists and the password is incorrect", () => {
    it("does not set the session cookie and returns an error", async () => {
      const res = await request(app).post("/sessions").send({
        email: "test@example.com",
        password: "contrasenya123"
      });
      expect(res.status).toEqual(401);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("ValidationError");
    });
  });

  describe("When the email does not exist", () => {
    it("does not set the session cookie and returns an error", async () => {
      const res = await request(app).post("/sessions").send({
        email: "noone@example.com",
        password: "password123"
      });
      expect(res.status).toEqual(401);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toSatisfySchemaInApiSpec("ValidationError");
    });
  });
});
