import React from 'react'

const AboutUs = () => {
  return (
    <div className=''>
        <div className='h-40'></div>
            <h1 className='text-center font-bold text-4xl text-[#0B0047FF]'>
                Meet our team of creators, designers <br></br>problem and world-class  solvers
            </h1>
        <div className='flex justify-center items-center mb-10 mt-10 space-x-12'>
            <div className='flex flex-col w-70'>
                <div className='h-90 w-70 bg-[#e7e7e7] rounded-[10px] '>
                    <img src='bAustin.jpg' className='object-cover rounded-[10px] h-full w-full'/>
                </div>
                <h1 className='text-[20px] text-[#0B0047FF] font-bold'>Austin Stephens</h1>
                <h1 className='text-[15px]'>Lead Tech Engineer</h1>
                <p className='text-[14px] font-light'>It is a long established fact that a reader will be distracted.</p>
            </div>
            <div className='flex flex-col w-70'>
                <div className='h-90 w-70 bg-[#e7e7e7] rounded-[10px] '>
                    <img src='bAustin.jpg' className='object-cover rounded-[10px] h-full w-full'/>
                </div>
                <h1 className='text-[20px] text-[#0B0047FF] font-bold'>Augustine Stephens</h1>
                <h1 className='text-[15px]'>Lead Tech Engineer</h1>
                <p className='text-[14px] font-light'>It is a long established fact that a reader will be distracted.</p>
            </div>
            <div className='flex flex-col w-70'>
                <div className='h-90 w-70 bg-[#e7e7e7] rounded-[10px] '>
                    <img src='bAustin.jpg' className='object-cover rounded-[10px] h-full w-full'/>
                </div>
                <h1 className='text-[20px] text-[#0B0047FF] font-bold'>Oscar Stephens</h1>
                <h1 className='text-[15px]'>Lead Tech Engineer</h1>
                <p className='text-[14px] font-light'>It is a long established fact that a reader will be distracted.</p>
            </div>
        
        </div>
    </div>
  )
}

export default AboutUs