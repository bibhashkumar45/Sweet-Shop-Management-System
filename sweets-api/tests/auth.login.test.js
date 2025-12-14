// This test verifies the login functionality of the authentication API.
// It follows the TDD approach by first registering a user and then
// ensuring that the same user can successfully log in and receive a JWT token.

import request from "supertest";
import app from "../app.js";

describe("Auth Login API", () => {

  it("should login user and return token", async () => {

    const registerRes = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Bibhash",
        email: "login@test.com",
        password: "123456",
      });

    expect(registerRes.statusCode).toBe(200);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.msg).toBe("Logged in");
  });

});
