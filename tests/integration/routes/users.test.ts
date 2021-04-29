import request from "supertest";
import jestOpenAPI from "jest-openapi";
import path from "path";
import app from "../../../src/app";

jestOpenAPI(path.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));

describe("POST /users", () => {
  describe("when the email does not already exist and the passwords match", () => {
    it("creates and returns the user object", async () => {
      const res = await request(app).post("/users").send({
        email: "test@example.com",
        password: "password123",
        password_confirmation: "password123"
      });
      expect(res.status).toEqual(201);
      expect(res).toSatisfyApiSpec();
    });
  });

  describe("when the email already exists", () => {
    it("Fails with an error message", async () => {
      await request(app).post("/users").send({
        email: "test@example.com",
        password: "password123",
        password_confirmation: "password123"
      });
      const res2 = await request(app).post("/users").send({
        email: "test@example.com",
        password: "password123",
        password_confirmation: "password123"
      });
      expect(res2.status).toEqual(422);
      expect(res2).toSatisfyApiSpec();
    });
  });

  describe("when the passwords do not match", () => {
    it("Fails with an error message", async () => {
      const res = await request(app).post("/users").send({
        email: "test@example.com",
        password: "password123",
        password_confirmation: "contraseña123"
      });
      expect(res.status).toEqual(422);
      expect(res).toSatisfyApiSpec();
    });
  });
});
