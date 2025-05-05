import { Route, Routes } from "react-router";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AuthGate from "@/gates/AuthGate";
import ROUTES from "@/constants/urls";
import Main from "@/pages/Main";

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<Main />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route element={<AuthGate />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
