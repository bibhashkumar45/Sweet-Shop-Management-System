// This middleware protects private routes using JWT authentication.
// It verifies the token sent in the Authorization header and
// attaches the decoded user information to the request object
// so it can be used by subsequent middleware and controllers.

import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ msg: "No token, access denied" });

  const token = header.split(" ")[1];

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" });
  }
};
