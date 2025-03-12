import React from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'

const NavBar = ({userInfo, setStatusTask}) => {
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    console.log("Logout button clicked from hadndle logout function");
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <div className = "bg-white flex items-center justify-between px-6 p-3 drop-shadow shadow-sm">
        <div className="flex items-center gap-2">
          <div className='bg-primary w-7 h-7 rounded text-xs text-white flex items-center justify-center '>TM</div>
          <h2 className="text-xl font-medium text-primary py-2 cursor-pointer" onClick={() => setStatusTask("")}>TASKMAN</h2>
        </div>

        <div className='flex gap-10 items-center '>
        <div className='flex gap-8'>
        <button className='text-xs  hover:border-b-2 hover:border-b-btn_pending border-opacity-45 text-black   ' onClick={()=> setStatusTask("pending")}>PENDING</button>
        <button className='text-xs hover:border-b-2 hover:border-b-teal-400 border-opacity-45 text-black ' onClick={()=> setStatusTask("inprogress")}>IN-PROGRESS</button>
          <button className='text-xs hover:border-b-2 hover:border-b-green-600 border-opacity-45 text-black  ' onClick={()=> setStatusTask("completed")}>COMPLETED</button>
        </div>
          
        <ProfileInfo userInfo={userInfo} onLogout ={handleLogOut}/>

        </div>

      
    </div>

  )
}

export default NavBar
