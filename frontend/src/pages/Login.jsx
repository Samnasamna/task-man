import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/helper'
import axiosInstance from "../utils/axiosInstance.js"


const Login = ({setToken}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const [error, setError] = useState(null)

  const handleOnChange =(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!validateEmail(formData.email)){
      setError("Enter valid email address.")
      return
    }

    if(!formData.password){
      setError("Please enter the password.")
      return
    }

    setError("")
    setIsLoading(true);

    // login API call

    try{
      const response = await axiosInstance.post("/auth/login",formData)
      console.log(response)

      //handle login success
      if(response.data && response.data.token){
        localStorage.setItem("token",response.data.token)
        setToken(response.data.token);
        navigate('/dashboard')
      }
      
    }catch(e){
      if(e.response && e.response.data && e.response.data.message){
        setError(e.response.data.message)
      }else{
        setError("An unexpected error occurred!.. try again..")
      }

    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>

   <div className='flex items-center justify-center mt-28'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSubmit}>
          <h4 className='text-2xl mb-7'>Login</h4>

          <input 
            type="text" placeholder='Email' className='input-box' name='email'
            value={formData.email}
            onChange={handleOnChange} />

          <input type="password" placeholder='Password' className='input-box' 
          name='password'
          value={formData.password}
          onChange={handleOnChange}/>

          {error &&  <p className='text-red-500 text-xs pb-1'>{error}</p>}

          

          <button type='submit' className='btn-primary'> {isLoading? "..." : "Login"}</button>

          <p className='text-sm text-center mt-4'>Not registered yet? {" "}
            <Link to="/signUp" className='font-medium text-primary underline'>
              Create an Account
            </Link>
          </p>
        </form>
    </div>
   </div>

    </>
  )
}

export default Login
