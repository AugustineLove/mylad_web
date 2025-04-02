import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSchool } from '../../context/schoolContext';

const DashboardNav = () => {
  const { school, loading } = useSchool();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('schoolId');
    localStorage.removeItem('schoolName');
    navigate('/login');
  };

  if (loading || !school) return <div className='h-[60px] bg-blue-900 flex justify-center items-center text-white fixed w-full'></div>;

  return (
    <>
      {/* Fixed Navbar with Glassmorphism */}
      <div className="fixed top-0 left-0 w-full bg-[#0b2f3f] bg-opacity-90 backdrop-blur-md shadow-lg flex justify-between items-center py-4 px-[80px] text-white z-50 rounded-b-lg border-b border-gray-600">
        
        {/* Date & Time */}
        <div className="text-lg font-semibold">
          <p className="text-sm text-gray-300">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-white text-xl font-bold">{currentTime.toLocaleTimeString()}</p>
        </div>

        {/* School Info */}
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl font-extrabold text-[#00c6ff] uppercase tracking-wide drop-shadow-md">
            {school.schoolName}
          </h1>
          <p className="text-gray-300 text-sm">{school.schoolEmail}</p>
          <p className="text-gray-300 text-sm">{school.schoolAddress}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Edit Details Button */}
          <button
            onClick={() => navigate('editSchool')}
            className="cursor-pointer text-white py-2 px-6 bg-[#0077cc] font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 duration-300"
          >
            Edit Details
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="cursor-pointer text-white py-2 px-6 bg-[#c23030] font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-600 duration-300"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Adds space below the navbar */}
      <div className="pt-[80px]"></div>
    </>
  );
};

export default DashboardNav;
