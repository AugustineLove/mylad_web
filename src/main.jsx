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
import { SchoolProvider } from "./context/schoolContext.jsx";
import { StudentProvider } from "./context/studentsContext.jsx";
import AddStudent from "./views/dasboard/addStudent.jsx";
import SelectedFees from "./views/dasboard/selectedFees.jsx";
import ClassFees from "./views/dasboard/classFee.jsx";
import StudentFeeTypeDetails from "./views/dasboard/studentFeeTypeDetails.jsx";
import ReportPage from "./views/dasboard/generalReport.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <SchoolProvider>
    <StudentProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<App/>}>
    <Route index element={<HomePage />} />
        <Route path='login' element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome/>} /> 
          <Route index element={<DashboardHome/>} /> 
          <Route path="addFees" element={<AddFeesPage/>} />
          <Route path="generalReport" element={<ReportPage/>} />
          <Route path="addFees/addClassFee" element={<AddClassFeePage/>} />
          <Route path="addFees/selectedFees" element={<SelectedFees/>} />
          <Route path="addFees/selectedFees/classFee" element={<ClassFees/>} />
          <Route path="addFees/selectedFees/classFee/student" element={<StudentFeeTypeDetails/>} />
          <Route path="addStudent" element={<AddStudent/>} />
          <Route path="addFees/addClassFee/studentDetails" element={<StudentsDetails/>} />
          <Route path="studentDetails" element={<StudentsDetails/>} />
        
        </Route>
</Route>
    </Routes>
  </BrowserRouter>
    </StudentProvider>
  </SchoolProvider>
);
