import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoute() {
  const {user} = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}
