import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSchool } from '../../context/schoolContext';

const DashboardNav = () => {
  const { school, loading } = useSchool();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('schoolId');
    localStorage.removeItem('schoolName');
    navigate('/login');
  };

  if (loading || !school) return <div className='h-[60px] bg-blue-900 flex justify-center items-center text-white fixed w-full'></div>;

  return (
    <>
      {/* Fixed Navbar */}
      <div className='fixed top-0 left-0 w-full bg-[#110e29] flex justify-between py-3 px-[80px] items-center text-white z-50'>
        {/* Date & Time */}
        <div className="text-lg font-bold">
          <p className="text-sm">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p> {/* Date */}
          <p>{currentTime.toLocaleTimeString()}</p> {/* Time */}
        </div>

        {/* School Info */}
        <div className='flex flex-col justify-center items-center text-center'>
          <h1 className="text-[20px] font-bold">{school.schoolName}</h1>
          <p>{school.schoolEmail}</p>
          <p>{school.schoolAddress}</p>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="cursor-pointer text-white py-2 px-4 bg-[#850000] rounded">
          Log out
        </button>
      </div>

      {/* Adds space below the navbar */}
      <div className="pt-[80px]"></div>
    </>
  );
};

export default DashboardNav;
