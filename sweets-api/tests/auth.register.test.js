// This test checks the user registration functionality of the auth API.
// It ensures that a new user can successfully register and receive
// a proper success response. This test is written following the
// Test-Driven Development (TDD) approach.

import request from "supertest";
import app from "../app.js";

describe("Auth Register API", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Bibhash",
        email: "bibhash@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("User created");
  });

});
