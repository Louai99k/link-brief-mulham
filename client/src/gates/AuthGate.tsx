import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/stores/auth-store";
import ROUTES from "@/constants/urls";

const AuthGate = () => {
  const { isAuth, checkingAuth } = useAuth();

  if (!isAuth) {
    if (checkingAuth) {
      return <p>loading...</p>;
    }

    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default AuthGate;
