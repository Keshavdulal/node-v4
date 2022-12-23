import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should send back some data", async () => {
    // #1 Make a request using supertest
    const res = await supertest(app).get("/");

    // #2 Run assertions on response
    expect(res.body.message).toBe("Hello from Express");
  });
});
