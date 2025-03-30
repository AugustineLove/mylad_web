import { Outlet, useLocation } from "react-router";
import NavBar from "./components/navBar";
import AppFooter from "./components/AppFooter"; // Assuming you have a footer
import './App.css';

const App = () => {
  const location = useLocation();
  const dashboardRoutes = [
    '/dashboard', '/dashboard/transactions', 
    '/dashboard/agents', '/dashboard/messages', 
    '/dashboard/customers', '/login', '/dashboard/addFees', '/dashboard/addFees/addClassFee', '/dashboard/addFees/addClassFee/studentDetails','/dashboard/studentDetails',
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



