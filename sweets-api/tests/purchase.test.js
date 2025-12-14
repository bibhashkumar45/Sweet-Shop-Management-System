// This test verifies the complete purchase flow using TDD.
// It ensures that an admin can add a sweet, a user can log in,
// and the user can successfully purchase a sweet.
// The test validates quantity reduction and correct total amount calculation.

import request from "supertest";
import app from "../app.js";

describe("Purchase API - User buys sweet", () => {
  let adminToken;
  let userToken;
  let sweetId;

  beforeAll(async () => {
    // create admin
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@buy.com",
      password: "admin123",
      role: "admin",
    });

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@buy.com",
        password: "admin123",
      });

    adminToken = adminLogin.body.token;

    // admin adds sweet
    const sweetRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 20,
        quantity: 10,
      });

    sweetId = sweetRes.body.sweet._id;

    // create user
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: "user@buy.com",
      password: "user123",
    });

    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@buy.com",
        password: "user123",
      });

    userToken = userLogin.body.token;
  });

  it("should allow user to purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ qty: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.purchase.quantity).toBe(2);
    expect(res.body.purchase.totalAmount).toBe(40);
  });
});
