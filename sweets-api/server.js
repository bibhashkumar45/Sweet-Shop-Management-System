// This is the main entry point of the application.
// It loads environment variables, establishes the database connection,
// and starts the Express server. All application configuration
// is kept in app.js to support clean architecture and easy testing.

import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
