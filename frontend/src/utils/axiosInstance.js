import axios from "axios"
import {BASE_URL} from "../utils/constants.js"

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login"; 
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;