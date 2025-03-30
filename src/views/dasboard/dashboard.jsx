import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Outlet } from "react-router";
import DashboardNav from '../../components/dashboard/dashboardNav';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Check if user is logged in
    if (!authToken) {
      navigate('/login'); // Redirect if not authenticated
    }
  }, [navigate]);

  return ( 
   <>
     <DashboardNav />
     <div className="flex h-screen">
       <div className="flex-1 p-[70px]">
         <Outlet />
       </div>
     </div>
   </>
  );
};

export default Dashboard;
