import React, { useState } from 'react';
import { EmailCard, WhatsAppIcon } from '../assets';
import AppButton from '../components/button';
import { baseUrl } from '../constants/helpers';

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (service) => {
    setForm((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.message) {
      alert('Email and message are required.');
      return;
    }

    try {
      const res = await fetch(`${baseUrl}contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Message sent successfully!');
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          services: [],
        });
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send message.');
    }
  };

  const servicesList = [
    'Website design',
    'UX/UI Design',
    'User Research',
    'Mobile App Development',
    'Network Setup',
    'Others',
  ];

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
              <input
                name='firstName'
                value={form.firstName}
                onChange={handleChange}
                type='text'
                placeholder='First name'
                className='input-field'
              />
            </div>
            <div className='flex flex-col w-1/2'>
              <label className='text-gray-700 font-medium'>Last Name</label>
              <input
                name='lastName'
                value={form.lastName}
                onChange={handleChange}
                type='text'
                placeholder='Last name'
                className='input-field'
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Email</label>
            <input
              name='email'
              value={form.email}
              onChange={handleChange}
              type='email'
              placeholder='example@gmail.com'
              className='input-field'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Phone Number</label>
            <input
              name='phone'
              value={form.phone}
              onChange={handleChange}
              type='text'
              placeholder='Phone number'
              className='input-field'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Message</label>
            <textarea
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Leave us a message...'
              className='input-field h-28'
            ></textarea>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {servicesList.map((service) => (
              <label className='checkbox' key={service}>
                <input
                  type='checkbox'
                  checked={form.services.includes(service)}
                  onChange={() => handleCheckbox(service)}
                />
                {service}
              </label>
            ))}
          </div>

          <AppButton name='Send Message' className='submit-button' onClick={handleSubmit} />
        </div>

        <div className='w-[35%]'>
          <h1 className='text-lg font-bold text-gray-900 mb-2'>Chat with us</h1>
          <p className='text-gray-600 mb-4'>Contact our team through these channels:</p>
          <div className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <EmailCard />
              <a href='mailto:augustinelovestephens@gmail.com' className='contact-link'>Send us an email</a>
            </div>
            <div className='flex items-center space-x-2'>
              <WhatsAppIcon />
              <a href='https://wa.me/+233542384752' className='contact-link'>WhatsApp Message</a>
            </div>
          </div>

          <h1 className='text-lg font-bold text-gray-900 mt-6 mb-2'>Call Us</h1>
          <p className='text-gray-600 mb-4'>Mon-Fri, 8AM - 4PM</p>
          <div className='flex items-center space-x-2'>
            <WhatsAppIcon />
            <a href='tel:+233542384752' className='contact-link'>+233542384752</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
