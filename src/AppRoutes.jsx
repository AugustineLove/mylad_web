import { Routes, Route } from "react-router";
import Login from "./views/loginPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
