import { Outlet, useLocation } from "react-router";
import NavBar from "./components/navBar";
import './App.css';
import AppFooter from "./components/appFooter";

const App = () => {
  const location = useLocation();
  const dashboardRoutes = [
    '/dashboard', '/dashboard/transactions', 
    '/dashboard/agents', '/dashboard/messages', 
    '/dashboard/customers', '/login', '/dashboard/addFees', '/dashboard/editSchool', '/dashboard/classRecord', '/dashboard/classRecord/classDetails', '/dashboard/generalReport', '/dashboard/addFees/addClassFee', '/dashboard/addFees/addClassFee/studentDetails','/dashboard/studentDetails','/dashboard/studentDetails/editStudentDetails',
    '/dashboard/addStudent', '/dashboard/addFees/selectedFees','/dashboard/addFees/selectedFees/classFee','/dashboard/addFees/selectedFees/classFee/student'
  ];
  const hideNavbarAndFooter = dashboardRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <NavBar />}
      <Outlet />
      {!hideNavbarAndFooter && <AppFooter />}
    </>
  );
};

export default App;



