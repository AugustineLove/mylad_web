import React from 'react'
import AppButton from '../../components/button'
import TransactionTable from '../../components/dashboard/transactionTable'
import { transactionData } from '../../constants/transactionData'
import { useLocation } from 'react-router'

const StudentsDetails = () => {
    const location = useLocation();
  const student = location.state?.student; // Get student data

  if (!student) return <p>No student data available.</p>;
  return (
    <div>
        <div className='flex mt-[100px] space-x-[30px] items-center'>
            <div className='rounded-[100%] bg-gray-200 w-[210px] h-[210px]'></div>
            <div className='flex flex-col'>
                <h1 className='font-bold text-2xl'>
                    {student.name}
                </h1>
                <p>
                    {student.class}
                </p>
                <p className=''>
                    Outstanding Dept: {student.dept}
                </p>
                <input
          type="text"
          placeholder="Enter amount to pay"
          className="border mt-[20px] border-[#B5AFAF] p-2 rounded w-[500px] mb-[5px]"
        />
        <p className='text-red-400 mb-[10px]'>NB: This amount will be added to Stephens, Justus Love’s  account.</p>
        <AppButton name="Pay"/>
            </div>
        </div>

        <TransactionTable  studentsData={transactionData} />
    </div>
  )
}

export default StudentsDetails