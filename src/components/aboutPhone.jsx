import React from 'react';
import { motion } from 'framer-motion';

const AboutPhoneCard = ({ description, title }) => {
  return (
    <motion.div 
      className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">
          {description}
        </p>
      </div>
      <motion.div 
        className="w-20 h-20 rounded-xl overflow-hidden shadow-md"
        whileHover={{ scale: 1.05 }}
      >
        <img src="youngboy.png" alt="An image" className="object-cover w-full h-full" />
      </motion.div>
    </motion.div>
  );
};

export default AboutPhoneCard;
