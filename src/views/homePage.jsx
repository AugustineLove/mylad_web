import React from 'react';
import { motion } from 'framer-motion';
import AppButton from '../components/button';
import AboutPhoneCard from '../components/aboutPhone';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HomePage = () => {

    const features = [
        {
          title: 'Easy School Management',
          description: "Manage students' fees, class fees, and school data from anywhere with our easy-to-use app interface.",
          imgSrc: 'src/assets/school_management.png', // Replace with actual image path
        },
        {
          title: 'Real-Time Notifications',
          description: 'Receive real-time notifications for updates on fees payments, schedules, and school events.',
          imgSrc: 'src/assets/notifications.png', // Replace with actual image path
        },
        {
          title: 'Fee Payment Made Easy',
          description: 'Track and make payments for school fees directly from the app, with multiple payment options.',
          imgSrc: 'src/assets/fee_payment.png', // Replace with actual image path
        },
      ];

  return (
    <section className='px-3 lg:px-0 py-16 bg-gradient-to-b from-white to-gray-100'>
   {/* Hero Section */}
<motion.div 
  className='relative flex items-center justify-between px-6 py-16 lg:py-32 lg:px-24 bg-gradient-to-r from-[#2d098d] to-[#3c2a8d] text-white'

  initial='hidden' 
  animate='visible' 
  variants={fadeIn}
>
  {/* Left Section: Text Content */}
  <div className='flex flex-col w-full lg:w-1/2 space-y-6'>
    <h1 className='text-5xl md:text-7xl font-extrabold leading-tight'>
      Smart, Seamless & <br /> Future-Ready Schools
    </h1>
    <p className='text-lg md:text-xl text-gray-200 leading-relaxed'>
      Transform your school with a powerful, all-in-one management platform. From student records to fee payments, we simplify every process for administrators, teachers, parents, and students.
    </p>
    <AppButton name='Get Started' width={200} color='#0B0047FF' borderColor='#fff'/>
  </div>

  {/* Right Section: Image */}
  <motion.div 
    className='relative w-0 lg:w-1/2 h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-xl transform transition-all duration-300'
    whileHover={{ scale: 1.05 }}
  >
    <img 
      className='object-cover lg:w-full lg:h-full absolute top-0 left-0' 
      src='student.avif' 
      alt='Students'
    />
    {/* Optional Overlay for a More Modern Look */}
    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40'></div>
  </motion.div>

  {/* Animated Gradient Overlay */}
  <div className='absolute inset-0 bg-gradient-to-t from-[#1e45af] to-transparent opacity-40 pointer-events-none'></div>
</motion.div>



      {/* About Section */}
      <div className='flex flex-col items-center text-center py-16'>
      <div className='text-center space-y-6'>
      <div className='text-center space-y-8 py-16 bg-gray-50'>
  <h1 className='text-5xl font-bold text-blue-900'>Why Choose Our Platform?</h1>
  <p className='text-lg text-gray-700 mx-auto max-w-3xl leading-relaxed'>
    We understand the challenges schools face in managing students, teachers, and administration. That’s why we built an all-in-one platform that simplifies processes, enhances communication, and improves efficiency. With intelligent automation, real-time updates, and robust security, we help educational institutions thrive in the digital era.
  </p>

  <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10'>
    <div className='p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition duration-300'>
      <h2 className='text-2xl font-semibold text-blue-800'>Seamless School Management</h2>
      <p className='text-gray-600 mt-3 leading-relaxed'>
        From student enrollment to academic records and staff administration, our platform streamlines operations, allowing schools to focus on what truly matters—education.
      </p>
    </div>

    <div className='p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition duration-300'>
      <h2 className='text-2xl font-semibold text-blue-800'>Effortless Fee Payments</h2>
      <p className='text-gray-600 mt-3 leading-relaxed'>
        Parents can securely pay school fees online through multiple payment options, with instant receipts and automated tracking for school administrators.
      </p>
    </div>

    <div className='p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition duration-300'>
      <h2 className='text-2xl font-semibold text-blue-800'>Real-Time Communication</h2>
      <p className='text-gray-600 mt-3 leading-relaxed'>
        Keep everyone informed with instant updates, event reminders, and direct messaging between schools, teachers, parents, and students—all in one place.
      </p>
    </div>

    <div className='p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition duration-300'>
      <h2 className='text-2xl font-semibold text-blue-800'>Data Security & Privacy</h2>
      <p className='text-gray-600 mt-3 leading-relaxed'>
        We prioritize security with encrypted data storage, controlled access, and compliance with privacy regulations, ensuring your school's information is always safe.
      </p>
    </div>

    <div className='p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition duration-300'>
      <h2 className='text-2xl font-semibold text-blue-800'>Smart Reports & Analytics</h2>
      <p className='text-gray-600 mt-3 leading-relaxed'>
        Gain deep insights into students records, and financials with real-time report analytics that help administrators make informed decisions.
      </p>
    </div>

    <div className='p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition duration-300'>
      <h2 className='text-2xl font-semibold text-blue-800'>Access Anytime, Anywhere</h2>
      <p className='text-gray-600 mt-3 leading-relaxed'>
        Our cloud-based platform ensures seamless access on any device—desktop, tablet, or mobile—so learning and management never stop.
      </p>
    </div>
  </div>
</div>

        </div>

        <div className='w-full flex flex-col items-center text-center py-5 mt-10'>
  {/* Stylish line */}
  <div className='w-32 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900 rounded-full mt-2 mb-6'></div>

  {/* Styled paragraph */}
  <motion.p 
    className='text-gray-800 w-4/5 md:w-2/3 text-lg md:text-xl font-medium leading-relaxed tracking-wide'
    variants={fadeIn} 
    initial='hidden' 
    animate='visible'
  >
    Our platform streamlines school operations with automation, analytics, and a user-friendly interface to enhance learning experiences.
  </motion.p>
</div>

      </div>

    {/* Features Section */}
<motion.div 
  className='grid md:grid-cols-3 sm:grid-cols-1 gap-10 mx-auto w-5/6 mt-5'
  initial='hidden' 
  animate='visible' 
  variants={fadeIn}
>
  {[
    {
      title: "All Your Children, One App",
      description: "Access all your children's school information from different schools in one place. View updates seamlessly, no matter where they study.",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      title: "Seamless Communication",
      description: "Connect students, teachers, and parents instantly through an integrated messaging system, event notifications, and progress updates, where we have base plans and subscription plans",
      icon: "💬",
    },
    {
      title: "Automated Fee Management",
      description: "Simplify school payments with secure online transactions, automated invoicing, and real-time tracking for complete financial transparency.",
      icon: "💳",
    },
  ].map((feature, i) => (
    <motion.div 
      key={i} 
      className='p-10 bg-white shadow-xl rounded-3xl border-t-4 border-blue-600 text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative overflow-hidden'
      whileHover={{ scale: 1.08 }}
    >
      {/* Hover Effect Glow */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 hover:opacity-40 transition-all duration-500'></div>

      {/* Feature Icon */}
      <div className='text-5xl mb-4'>{feature.icon}</div>

      {/* Feature Title */}
      <h2 className='text-2xl font-bold text-gray-900'>{feature.title}</h2>

      {/* Feature Description */}
      <p className='text-gray-600 mt-4 leading-relaxed'>{feature.description}</p>
    </motion.div>
  ))}
</motion.div>


     {/* Mobile Application */}
<motion.div 
  className='w-100 lg:w-full flex justify-center items-center mt-36 gap-16 px-6 lg:px-16' 
  initial='hidden' 
  animate='visible' 
  variants={fadeIn}
>
  {/* Left Column (Phone Features) */}
  <div className="flex flex-col space-y-6 w-full lg:w-1/3">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out"
        >
          <AboutPhoneCard
            title={feature.title}
            description={feature.description}
            imgSrc={feature.imgSrc}
          />
        </motion.div>
      ))}
    </div>

  {/* Right Column (Phone Image with Animation) */}
  <div className='relative w-0 lg:w-2/5 h-full'>
    {/* Phone image */}
    <motion.img 
      className='absolute lg:w-[70%] object-cover bottom-[-350px] left-0 rounded-xl z-10' 
      src='phone.png' 
      alt='Mobile App' 
      whileHover={{ scale: 1.05 }}
    />
    {/* Overlay Image (Choose School) */}
    <motion.img 
      className='absolute right-10 bottom-[-350px] lg:right-24 w-0 lg:w-[70%] z-1' 
      src='chooseschool.png' 
      alt='Choose School' 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
    />
  </div>
</motion.div>

    </section>
  );
};

export default HomePage;
