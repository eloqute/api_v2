"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jest_openapi_1 = __importDefault(require("jest-openapi"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("../../../src/app"));
const db_1 = __importDefault(require("../../../src/db"));
jest_openapi_1.default(path_1.default.join(__dirname, "../../../api_spec/Macat-Macat-API-1.0.0-swagger.yaml"));
describe("POST /users", () => {
    beforeAll(async () => {
        await db_1.default.sync({ force: true });
    });
    afterAll(async () => {
        await db_1.default.close();
    });
    describe("when the email does not already exist and the passwords match", () => {
        it("creates and returns the user object", async () => {
            const res = await supertest_1.default(app_1.default).post("/users").send({
                email: "test@example.com",
                password: "password123",
                passwordConfirmation: "password123"
            });
            expect(res.status).toEqual(201);
            expect(res).toSatisfyApiSpec();
            expect(res.body).not.toHaveProperty("passwordHash");
        });
    });
    describe("when the email already exists", () => {
        it("Fails with an error message", async () => {
            await supertest_1.default(app_1.default).post("/users").send({
                email: "test@example.com",
                password: "password123",
                passwordConfirmation: "password123"
            });
            const res2 = await supertest_1.default(app_1.default).post("/users").send({
                email: "test@example.com",
                password: "password123",
                passwordConfirmation: "password123"
            });
            expect(res2.status).toEqual(422);
            expect(res2).toSatisfyApiSpec();
        });
    });
    describe("when the passwords do not match", () => {
        it("Fails with an error message", async () => {
            const res = await supertest_1.default(app_1.default).post("/users").send({
                email: "test@example.com",
                password: "password123",
                passwordConfirmation: "contraseña123"
            });
            expect(res.status).toEqual(422);
            expect(res).toSatisfyApiSpec();
        });
    });
});
