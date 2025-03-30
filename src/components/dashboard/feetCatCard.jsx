import React from 'react'

const FeeCatCard = (props) => {
  return (
    <div className='w-[190px] h-[160px] rounded-[5px] flex flex-col justify-center items-center hover:bg-green-100 border-[0.5px] border-gray-400'>
        <p>{props.label}</p>
    </div>
  )
}

export default FeeCatCard