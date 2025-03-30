import React from 'react';
import { useNavigate } from 'react-router';
import { useSchool } from '../../context/schoolContext';

const DashboardNav = () => {
  const { school, loading } = useSchool(); // Assume setSchool is used to clear school data
  const navigate = useNavigate();

  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authentication token
    
    localStorage.removeItem('schoolId')
    localStorage.removeItem('schoolName')
    navigate('/login'); // Redirect to login page
  };

  if (loading) return <div className='h-[60px] bg-blue-900 flex justify-center items-center text-white fixed w-[100%]'></div>;
  if (!school) return <div className='h-[60px] bg-blue-900 flex justify-center items-center text-white fixed w-[100%]'></div>;

  return (
    <div className='h-[60px] justify-between bg-green-900 flex px-[80px] items-center text-white fixed w-[100%]'>
      <h1 className="text-[20px] font-bold">{school.schoolName}</h1>
      <button onClick={handleLogout} className="cursor-pointer text-white py-2 px-4 rounded">
        Log out
      </button>
    </div>
  );
};

export default DashboardNav;
