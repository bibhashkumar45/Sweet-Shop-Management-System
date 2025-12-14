import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Protected({ children, adminOnly }) {
  const { user } = useContext(AuthContext);

  // if user not logged in
  if (!user) return <Navigate to="/login" />;

  // if admin-only page and user is not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
