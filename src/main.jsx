import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Login from "./views/loginPage.jsx";
import HomePage from "./views/homePage.jsx";
import DashboardHome from "./views/dasboard/dashboardHome.jsx";
import Dashboard from "./views/dasboard/dashboard.jsx";
import AddFeesPage from "./views/dasboard/addFeeClass.jsx";
import AddClassFeePage from "./views/dasboard/addFee.jsx";
import StudentsDetails from "./views/dasboard/studentsDetails.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<App/>}>
    <Route index element={<HomePage />} />
        <Route path='login' element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome/>} /> 
          <Route path="addFees" element={<AddFeesPage/>} />
          <Route path="addFees/addClassFee" element={<AddClassFeePage/>} />
          <Route path="addFees/addClassFee/studentDetails" element={<StudentsDetails/>} />
          <Route path="studentDetails" element={<StudentsDetails/>} />
        
        </Route>
</Route>
    </Routes>
  </BrowserRouter>
);
