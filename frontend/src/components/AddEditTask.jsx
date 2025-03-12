import { useState } from "react"
import axiosInstance from "../utils/axiosInstance"


const AddEditTask = ({data, type, onClose, getTasks, showToastMessage}) => {
    const [formData, setFormData] = useState({
        title:data?.title|| "",
        description: data?.description || ""
    })
    const [error, setError] = useState(null)

    // add task

    const addNewTask = async ()=>{
        try{
            const response = await axiosInstance.post("/user/tasks", formData);
            showToastMessage("Note Added Successfully!")
            getTasks();
            onClose();
        }catch(error){
            if(error.response.data){
                setError(error.response.data.message)
            }
        }
    }
    // edit task

    const editTask = async ()=>{
        try{
            console.log(data)
            const response = await axiosInstance.put(`/user/tasks/${data._id}`, formData);
            showToastMessage("Note Updated Successfully!")
            getTasks();
            onClose();
        }catch(error){
            if(error.response.data){
                setError(error.response.data.message)
            }
        }
    }

    const handleOnChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleAddTask = ()=>{
        if(!formData.title){
            setError("please enter the title");
            return;
        }

        setError("")

        if(type === 'edit'){
            editTask()
        }else{
            addNewTask()
        }
    }
    

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className='input-label'>TITTLE</label>
        <input 
            type="text"
            value={formData.title}
            name="title"
            onChange={handleOnChange}
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go to Gym At 5' />
      </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className='input-label'>DESCRIPTION</label>
           <textarea 
           name="description"
           value={formData.description}
           onChange={handleOnChange}
           type="text"
           className='text-sm text-slate-950 outline-none bg-slate-50 rounded p-2'
           placeholder='enter your description...'
           rows={10}/>
        </div>

        {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

        

        <button className='btn-primary font-medium mt-5 p-3' 
        onClick={handleAddTask}>{type === 'edit' ? 'UPDATE':'ADD'}</button>
        <button className='w-full border border-gray-200 font-medium mt-3 p-2 text-slate-400 rounded-sm hover:scale-105' onClick={onClose}>cancel</button>
    </div>
  )
}

export default AddEditTask
