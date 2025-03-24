import React from 'react'

const AppFooter = () => {
  return (
    <div className='bg-[#083c5d] h-[600px] flex flex-col items-center justify-center'>

        <div className='flex items-center justify-center'>
            <div className='flex flex-col w-[20%]'>
                <h1 className='text-[#fff]  font-bold'>AppName</h1>
                <p className='text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
            <div className='flex flex-col w-[20%]'>
                <h1 className='text-[#fff]  font-bold'>Quick Links</h1>
                <ul className='text-white'>
                    <li>Our Website</li>
                    <li>Schools</li>
                    <li>Get Started</li>
                    <li>Login</li>
                </ul>
            </div>
            <div className='flex flex-col w-[20%]'>
                <h1 className='text-[#fff]  font-bold'>Contact</h1>
                <ul className='text-white'>
                    <li>augustinelovestephens@gmail.com</li>
                    <li>+233593528296</li>
                </ul>
            </div>
            <div className='flex flex-col w-[20%]'>
                <h1 className='text-[#fff]  font-bold'>Download</h1>
                <img className='w-[180px] h-[50px] mt-5' src='src/assets/playstore.webp'/>
            </div>
        </div>

        <div className='h-[1px] w-[65%] bg-white mt-[100px]'></div>
        <div className='flex items-start justify-start w-[65%] mt-3'><p className='text-start'>Copyright 2025. All Rights reserved. Created by the family of the Stephens</p></div>

    </div>
  )
}

export default AppFooter