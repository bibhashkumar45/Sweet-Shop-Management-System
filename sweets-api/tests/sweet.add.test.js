// This test verifies that an admin user can successfully add a new sweet.
// It follows the TDD approach by first authenticating an admin and then
// checking that the sweet creation API works correctly when proper
// authorization is provided.

import request from "supertest";
import app from "../app.js";

describe("Sweet API - Admin Add Sweet", () => {
  let adminToken;

  beforeAll(async () => {
    // register admin
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@sweet.com",
        password: "admin123",
        role: "admin",
      });

    // login admin
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@sweet.com",
        password: "admin123",
      });

    adminToken = res.body.token;
  });

  it("should allow admin to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 10,
        quantity: 50,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.name).toBe("Rasgulla");
  });
});
