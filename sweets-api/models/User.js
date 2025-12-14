// This model represents a user in the system.
// It stores basic authentication and authorization details
// such as name, email, hashed password, and user role.
// The role field helps differentiate between normal users
// and admin users for access control.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }   
});

export default mongoose.model("User", userSchema);
