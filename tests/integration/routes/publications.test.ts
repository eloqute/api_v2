import request from "supertest";
import app from "../../../src/app";

describe("GET /publications", () => {
  it("should retrieve the list of publications", async () => {
    const res = await request(app)
      .get("/publications");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String)
        })
      ])
    );
  });
});
