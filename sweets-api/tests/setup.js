// This setup file configures the testing environment for Jest.
// It sets required environment variables and starts an in-memory
// MongoDB instance so tests can run in isolation without touching
// the real database. The database is started before all tests
// and properly closed after the test suite finishes.

process.env.JWT_SECRET = "testsecret";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
}, 30000);

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
  if (mongo) {
    await mongo.stop();
  }
});
