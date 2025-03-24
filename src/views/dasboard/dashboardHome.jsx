import React from 'react'
import FeeCatCard from '../../components/dashboard/feetCatCard'
import { NavLink } from 'react-router'
import StudentTable from '../../components/dashboard/studentsTable'
import { studentsData } from '../../constants/studentData'

const DashboardHome = () => {
    const listofFees = [
       { name: 'School Fees', path: '/addSchoolFees', color: '#083C5D'},
        {name: 'Admission Fees', path: '/addAdmissionFees', color: '#FFBB39'},
        {name: 'PTA Fees', path: '/addPTAFees', color: '#083C5D'},
        {name: 'Exam Fees', path: '/addExamFees', color: '#FFBB39'},
        {name: 'Sports Fees', path: '/addSportsFees', color: '#083C5D'}
    ]
  return (
    <>
      <div className='mt-[50px] flex space-x-[50px] justify-center items-center'>
      {listofFees.map((list) => (
  <NavLink to={`addFees?type=${encodeURIComponent(list.name)}`}>
    <FeeCatCard label={list.name} bgColor={list.color} />
  </NavLink>
))}

    </div>

    <StudentTable studentsData={studentsData} />
    </>


  )
}

export default DashboardHome