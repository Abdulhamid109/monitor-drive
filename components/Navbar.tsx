"use client"
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Navbar = () => {
  const session = getCookie("token");
  const router = useRouter();
  console.log(session);


  const onLogout = async()=>{
    try {
      console.log("Token => "+session)
      const response = await axios.get("/api/logout");
      if(response.status===200){
        toast.success(response.data.message || "Successfully logged out!!");
        router.push("/login")
      }
    } catch (error) {
      console.log("Error=>"+error);
      if(error instanceof AxiosError){
        console.log("Error"+JSON.stringify(error));
        toast.error(error.response?.data.error);
      }
    }
  }

  return (
    <nav className="w-full fixed top-0 flex justify-between items-center p-4 md:px-8 backdrop-blur-lg bg-white/30 shadow-lg z-50">
      <Link href={"/"}>
      <h1 className="md:text-2xl text-xl font-semibold text-gray-800">
        Monitor Drive
      </h1>
      </Link>

      {session?<><button onClick={onLogout} className='p-2 bg-red-600 rounded-md'>Logout</button></>:<></>}


      
    </nav>
  )
}

export default Navbar