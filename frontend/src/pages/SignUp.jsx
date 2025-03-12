import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance'

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  })
  const [error, setError] = useState(null)

  const handleOnChange =(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!formData.name){
      setError("Please enter the user name.")
      return
    }

    if(!validateEmail(formData.email)){
          setError("Enter valid email address.")
          return
        }
    
    if(!formData.password){
      setError("Please enter the password.")
      return
    }

    if(!validatePassword(formData.password)){
      setError("password must be 8 characters or above.")
      return
    }

    
    setError("")

    // register API call

    try{
      console.log("runningg")
      const response = await axiosInstance.post("/auth/register",formData)
      console.log(response.data)

      //handle login success

      if(response.data && response.data.token){
        localStorage.setItem("token",response.data.token)
        navigate('/dashboard')
      }
      
    }catch(e){
      console.log(e)
      
      if(e.response){
        setError(e.response.data?.message || "Something went wrong.");
      }else{
        setError("An unexpected error occurred!.. try again..")
      }

    }
  }
  return (
    <>
    <div className='flex items-center justify-center mt-28'>
     <div className='w-96 border rounded bg-white px-7 py-10'>
         <form onSubmit={handleSubmit}>
           <h4 className='text-2xl mb-7'>Sign Up</h4>

           <input 
             type="text" placeholder='UserName' className='input-box' name='name'
             value={formData.name}
             onChange={handleOnChange} />
 
           <input 
             type="text" placeholder='Email' className='input-box' name='email'
             value={formData.email}
             onChange={handleOnChange} />
 
           <input type="password" placeholder='Password' className='input-box' 
           name='password'
           value={formData.password}
           onChange={handleOnChange}/>
 
           {error &&  <p className='text-red-500 text-xs pb-1'>{error}</p>}
 
           
 
           <button type='submit' className='btn-primary'> Sign up</button>
 
           <p className='text-sm text-center mt-4'>Already registered user ? {" "}
             <Link to="/login" className='font-medium text-primary underline'>
               login
             </Link>
           </p>
         </form>
     </div>
    </div>
 
     </>
  )
}

export default SignUp
