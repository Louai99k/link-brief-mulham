import { Route, Routes } from "react-router";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AuthGate from "@/gates/AuthGate";
import ROUTES from "@/constants/urls";
import Main from "@/pages/Main";
import { Toaster } from "@/components/ui/sonner";
import NoAuthGate from "./gates/NoAuthGate";
import MainLayout from "./layouts/MainLayout";
import Links from "./pages/Links";
import Link from "./pages/Link";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.LINK_PAGE(":shortLink")} element={<Link />} />
        <Route element={<NoAuthGate />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
        <Route element={<AuthGate />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.LINKS} element={<Links />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
