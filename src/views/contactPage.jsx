import React from 'react';
import { EmailCard, WhatsAppIcon } from '../assets';
import AppButton from '../components/button';

const ContactPage = () => {
  return (
    <div className='pt-[150px] flex flex-col items-center'>
      <div className='w-[40%] text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-gray-900 mb-4'>Contact Our Team</h1>
        <p className='text-gray-600 text-lg'>
          Got any questions about our services? Need our team to work on a project? We're here to help!
        </p>
      </div>

      <div className='w-[70%] flex flex-wrap justify-between gap-10 mb-10'>
        <div className='flex flex-col space-y-5 w-[60%]'>
          <div className='flex space-x-6'>
            <div className='flex flex-col w-1/2'>
              <label className='text-gray-700 font-medium'>First Name</label>
              <input type='text' placeholder='First name' className='input-field' />
            </div>
            <div className='flex flex-col w-1/2'>
              <label className='text-gray-700 font-medium'>Last Name</label>
              <input type='text' placeholder='Last name' className='input-field' />
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Email</label>
            <input type='email' placeholder='example@gmail.com' className='input-field' />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Phone Number</label>
            <input type='text' placeholder='Phone number' className='input-field' />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Message</label>
            <textarea placeholder='Leave us a message...' className='input-field h-28'></textarea>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='checkbox'><input type='checkbox' /> Website design</label>
              <label className='checkbox'><input type='checkbox' /> UX/UI Design</label>
              <label className='checkbox'><input type='checkbox' /> User Research</label>
            </div>
            <div className='space-y-2'>
              <label className='checkbox'><input type='checkbox' /> Mobile App Development</label>
              <label className='checkbox'><input type='checkbox' /> Network Setup</label>
              <label className='checkbox'><input type='checkbox' /> Others</label>
            </div>
          </div>

          <AppButton name='Send Message' className='submit-button' />
        </div>

        <div className='w-[35%]'>
          <h1 className='text-lg font-bold text-gray-900 mb-2'>Chat with us</h1>
          <p className='text-gray-600 mb-4'>Contact our team through these channels:</p>
          <div className='space-y-3'>
            <div className='flex items-center space-x-2'><EmailCard /> <a href='' className='contact-link'>Send us an email</a></div>
            <div className='flex items-center space-x-2'><WhatsAppIcon /> <a href='' className='contact-link'>WhatsApp Message</a></div>
          </div>

          <h1 className='text-lg font-bold text-gray-900 mt-6 mb-2'>Call Us</h1>
          <p className='text-gray-600 mb-4'>Mon-Fri, 8AM - 4PM</p>
          <div className='flex items-center space-x-2'><WhatsAppIcon /> <a href='' className='contact-link'>+233542384752</a></div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

// Styles
const styles = `
.input-field {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;
}
.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}
.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.submit-button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.3s ease;
}
.submit-button:hover {
  background-color: #0056b3;
}
.contact-link {
  font-weight: bold;
  color: #007bff;
  transition: color 0.3s;
}
.contact-link:hover {
  color: #0056b3;
}
`;

const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
