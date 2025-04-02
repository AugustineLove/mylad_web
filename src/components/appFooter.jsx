import React from 'react';

const AppFooter = () => {
  return (
    <div className="bg-gradient-to-r from-[#2d098d] to-[#3c2a8d] py-16 px-4 text-white">
      {/* Footer Content */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* App Info Section */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-extrabold text-white">My Ward</h1>
          <p className="text-lg text-gray-300">
            A platform designed to streamline school management. Empowering educators, students, and parents with seamless tools and communication.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <a href="#">Our Website</a>
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <a href="#">Schools</a>
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <a href="#">Get Started</a>
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <a href="#">Login</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <a href="mailto:augustinelovestephens@gmail.com">augustinelovestephens@gmail.com</a>
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <a href="tel:+233593528296">+233593528296</a>
            </li>
          </ul>
        </div>

        {/* Download Section */}
        <div className="flex flex-col space-y-4 items-start">
          <h2 className="text-2xl font-semibold text-white">Download</h2>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img className="w-[180px] h-[50px] object-contain hover:scale-105 transition-transform duration-300" src="playstore.webp" alt="Download from Playstore" />
          </a>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-[1px] bg-gray-400 mt-12 mb-8"></div>

      {/* Copyright Section */}
      <div className="text-center text-gray-300">
        <p className="text-lg">&copy; 2025. All Rights Reserved. Created by the family of the Stephens</p>
      </div>
    </div>
  );
};

export default AppFooter;
