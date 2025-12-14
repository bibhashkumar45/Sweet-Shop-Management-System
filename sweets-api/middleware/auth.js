import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ msg: "No token, access denied" });

  const token = header.split(" ")[1];

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData; // add user data to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" });
  }
};
