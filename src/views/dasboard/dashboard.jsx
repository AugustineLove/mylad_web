import React from 'react'

import { Outlet } from "react-router";
import DashboardNav from '../../components/dashboard/dashboardNav';

const Dashboard = () => {
  return ( 
   <>
   <DashboardNav />
    <div className="flex h-screen">
<div className="flex-1 p-[70px]"><Outlet/></div>    </div>
   </>
  );
}
export default Dashboard;