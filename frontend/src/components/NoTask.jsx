import React from 'react'
import notFound from "../assets/notFound.jpg"

const NoTask = () => {
  return (
    <div className='flex flex-col items-center m-20'>
      <img src={notFound} alt="" className='w-80 ' />
      <p className='text-sm text-slate-400'>No Task Found!</p>
    </div>
  )
}

export default NoTask
