import request from "supertest";
import app from "../app.js";

describe("Auth Login API", () => {

  it("should login user and return token", async () => {

    // First register user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Bibhash",
        email: "login@test.com",
        password: "123456",
      });

    //  Now login
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
