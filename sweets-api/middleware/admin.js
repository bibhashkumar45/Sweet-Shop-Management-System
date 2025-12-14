// This middleware restricts access to admin-only routes.
// It checks the user's role from the decoded JWT and
// allows the request to continue only if the user is an admin.

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Admins only" });

  next();
};
