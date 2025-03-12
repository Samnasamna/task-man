import React, { useState } from 'react'

const ProfileInfo = ({userInfo, onLogout}) => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <div className='relative flex items-center gap-3'>
        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 hover:border-primary hover:text-primary  font-medium  cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {userInfo.name?.charAt(0).toUpperCase() || " "}
        </div>
        {isOpen && <div className='absolute top-11 right-1 bg-white border p-4 rounded-md z-50'>
            <p className='text-sm font-medium'>{userInfo.name} </p>
            <button className='text-sm text-slate-700 underline cursor-pointer' onClick={()=>{
              console.log("Logout button clicked");
              setIsOpen(false)
              onLogout()
            }
            }>
                Logout
            </button>
        </div>}
      
    </div>
  )
}

export default ProfileInfo
