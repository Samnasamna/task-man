import moment from 'moment';
import React from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const TaskItem = ({ taskId, title, date, description, status, onEdit, onDelete, getTasks }) => {
  const statusColors = {
    completed: "bg-btn_completed",
    pending: "bg-btn_pending",
    inprogress: "bg-btn_inprogress"
  };

  const handleStatusUpdate = async ()=>{
    try{
      const response = await axiosInstance.put(`/user/tasks/${taskId}`,{
        status: status === "pending" ? "inprogress" : status === "inprogress" ? "completed" : "pending"
      })
      if(response.data){
        console.log("updated successfullyy")
        getTasks();
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='border rounded-2xl p-5 bg-white hover:shadow-xl transition-all ease-in-out w-[350px] mt-6'>
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className='text-sm font-medium '>{title}</h6>
          <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
        </div>
      </div>

      <p className='text-xs text-slate-600 mt-2 '>{description?.slice(0, 50)}...</p>

      <div className='flex items-center justify-between mt-3'>
        <button className={`status-container ${statusColors[status]} hover:scale-105`} onClick={handleStatusUpdate}>{status.toUpperCase() || "PENDING"}</button>

        <div className="flex items-center gap-2 mt-2">
          <MdCreate className='icon-btn hover:text-black' onClick={onEdit} />
          <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;