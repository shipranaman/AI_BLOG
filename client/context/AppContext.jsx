import { createContext,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const AppContext=createContext()
export const AppProvider=({children})=>{
    const navigate=useNavigate()

    const [token,setToken]=useState(null)
    const[blogs,setBlogs]=useState([])
    const[input,setInput]=useState("")
    const fetchBlogs = async()=>{
        try {
        console.log("Calling API...");

        const { data } = await axios.get("/api/blog/all");

        console.log(data);

        data.success
            ? setBlogs(data.blogs)
            : toast.error(data.message);

    } catch (error) {
        console.log(error);
        console.log(error.response);
        toast.error(error.message);
    }
    }
    useEffect(()=>{
        fetchBlogs()
        const token=localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization']=`${token}`
        }

    },[])
    const value={
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput,fetchBlogs
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext=()=>{
    return useContext(AppContext)
}