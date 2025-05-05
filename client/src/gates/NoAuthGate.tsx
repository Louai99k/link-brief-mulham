import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/stores/auth-store";
import ROUTES from "@/constants/urls";

const NoAuthGate = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return <Outlet />;
};

export default NoAuthGate;
