"use client"
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {
  const {id} = useParams();
  const [data,setdata] = useState<string[]>([]);
  const getAttendanceData =async()=>{
    try {
      const response = await axios.get(`/api/getattendances?cid=${id}`);
      if(response.status===200){
        console.log(response.data.records);
        setdata(response.data.records.Date)
      }
    } catch (error) {
      console.log("Failed to perform the functionnality");
      if(error instanceof AxiosError){
        console.log("Err=>"+error.response?.data.error);
        toast.error(error.response?.data.error)
      }
    }
  }

  useEffect(()=>{
    const display =async()=>{
      await getAttendanceData();
    }
    display();
  },[])

  return (
    <div>page -- Fed Up
      {data.map((d)=>(
        <div key={1}>{d}</div>
      ))}
    </div>
  )
}

export default Page