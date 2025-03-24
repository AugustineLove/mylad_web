import React from 'react'

const FeeCatCard = (props) => {
  return (
    <div className='w-[190px] h-[160px] rounded-2xl flex flex-col justify-center items-center shadow-lg' style={{backgroundColor: props.bgColor}}>
        <p>{props.label}</p>
    </div>
  )
}

export default FeeCatCard