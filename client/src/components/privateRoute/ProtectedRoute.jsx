import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return user ? (
    <Navigate to={`/${user.role}`} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
