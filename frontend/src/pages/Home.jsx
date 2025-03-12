import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import TaskItem from '../components/TaskItem'
import { MdAdd } from 'react-icons/md'
import AddEditTask from '../components/AddEditTask'
import Modal  from "react-modal"
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
import NoTask from '../components/NoTask'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null
})
const navigate = useNavigate();
const [userInfo, setUserInfo]  =useState({})
const [allTasks, setAllTasks] = useState([])
const [statusTask, setStatusTask] = useState("")
const [showToastMsg, setshowToastMsg] = useState({
  isShown:false,
  type:"add",
  message:""
})

const showToastMessage =(message, type)=>{
  setshowToastMsg({
    isShown:true,
    message,
    type
  })
}
const handleCloseToast =()=>{
  setshowToastMsg({
    isShown:false,
    message:""
  })
}
const handleEdit = (taskDetails)=>{
  setOpenAddEditModal({isShown:true, type:"edit", data:taskDetails})
}


//get user details for profile
const getUserInfo = async ()=>{
  try{
    const response = await axiosInstance.get("/auth/current");
    if(response.data ){
      setUserInfo(response.data)
    }
  }catch(error){
    if(error.response.status === 401){
      localStorage.clear();
      navigate("/login")
    }
  }
}

//get user created tasks
const getTasks = async ()=>{
  try{
    const response = await axiosInstance.get(`/user/tasks?status=${statusTask}`);
    console.log(response.data)
    if(response.data){
      setAllTasks([...response.data]);
    }
  }catch(error){
   console.log("something went wrong...")
  }
}

//delete task
const deleteTask = async (data)=>{
  try {
    console.log(data._id)
    const response = await axiosInstance.delete(`/user/tasks/${data._id}`);
    console.log(response.data); 

    if (response.data && response.data.success) {
      showToastMessage("Note Deleted Successfully!", "delete");
      setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== data._id));
      await getTasks();
    }
  } catch (error) {
    console.error("Delete error:", error);
    if (error.response?.data) {
      showToastMessage(error.response.data.message, "error");
    }
  }

}

useEffect(()=>{
  getUserInfo();
  getTasks();
  return ()=>{};
},[statusTask])

  return (
    <>
    <NavBar 
        userInfo = {userInfo} 
        setStatusTask={setStatusTask}/>
        
    {allTasks.length > 0 ? <div>
      <div className='grid grid-cols-4 gap-3 mx-6 '>
      {
        allTasks.map((task) => (
          <TaskItem 
            key={task._id}
            taskId = {task._id}
            title={task.title}
            date={task.createdOn}
            description={task.description}
            status={task.status}
            onEdit={() => handleEdit(task)}
            onDelete={() => deleteTask(task)}
            getTasks={getTasks}
          />
        ))
      }
    </div>
    </div> : <NoTask/>}
    <Modal
        isOpen={openAddEditModal.isShown}
        onRequestCLose={()=>{}}
        style={{
            overlay:{
                backgroundColor:"rgba(0,0,0,0.2)",
            },
        }}
        contentLabel=""
        className="w-[35%] max-h-3/4 bg-white rounded-md mx-[35%] mt-40 p-5 "
      >
      <AddEditTask
      type={openAddEditModal.type}
      data = {openAddEditModal.data}
      getTasks={getTasks}
        onClose={()=>{
          setOpenAddEditModal({isShown:false, type:"add", data:null})
        }}
        showToastMessage = {showToastMessage}
      />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}/>
    <button className='absolute bottom-10 right-10 bg-pink-600 rounded-full p-3 hover:scale-105 shadow-md' onClick={()=>{
        setOpenAddEditModal({isShown:true, type:"add", data:null})
      }}><MdAdd size={24} color='white'/></button>
    </>
  )
}

export default Home
