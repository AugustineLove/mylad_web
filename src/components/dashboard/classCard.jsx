import React from 'react'

const ClassCard = (props) => {
  return (
    <div className='w-[170px] h-[120px] bg-[#F5F5F5] rounded-[10px] flex justify-center items-center'>{props.label}</div>
  )
}

export default ClassCard