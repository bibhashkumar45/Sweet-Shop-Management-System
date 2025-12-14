// This controller handles authentication-related operations.
// It contains logic for user registration and login.
// Passwords are securely hashed and JWT tokens are generated
// to manage user authentication in a safe and scalable way.

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "user"
    });

    res.json({ msg: "User created", user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ msg: "Logged in", token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
