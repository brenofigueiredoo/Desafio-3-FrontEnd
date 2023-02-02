import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../../context";

const ProtectedRoutes = () => {
  const { authToken } = useContext(Context);

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;