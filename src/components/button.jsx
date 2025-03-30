import React from 'react'

const AppButton = (props) => {
  return (
    <div className='bg-[#083C5D] w-[150px] p-[5px] text-white rounded-[5px] text-center hover:cursor-pointer' onClick={props.onClick}>{props.name}</div>
  )
}

export default AppButton