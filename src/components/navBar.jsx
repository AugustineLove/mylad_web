import React from 'react';
import { navLinks } from '../constants/navLinks';
import { NavLink } from 'react-router';
import AppButton from './button';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <motion.nav 
      className="bg-white shadow-lg flex items-center justify-between h-[80px] text-gray-900 fixed w-full z-50 px-10 border-b border-gray-200 mb-10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide text-blue-900">MyWard</div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-6 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => 
                  `hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Login Button */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <a href="/login">
          <AppButton name="Login" color='#2d098d'/>
        </a>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;