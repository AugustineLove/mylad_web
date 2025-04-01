import React from 'react'

const AppButton = (props) => {
  return (
    <div className='bg-[#327097] p-[15px] text-white rounded-[5px] text-center hover:cursor-pointer border' style={{width: props.width, backgroundColor: props.color, borderColor: props.borderColor}}  onClick={props.onClick}>{props.name}</div>
  )
}

export default AppButton