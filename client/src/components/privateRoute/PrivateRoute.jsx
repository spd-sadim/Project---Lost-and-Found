import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoute({ allowedRoles }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  return user.role === allowedRoles ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
