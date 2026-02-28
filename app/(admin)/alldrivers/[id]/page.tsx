"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


interface Data {
  _id: string;
  customerId: string;
  Date: string;
  Status: boolean
}

const Page = () => {
  const { id } = useParams();
  const [data, setdata] = useState<Data[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [attId,setAttId] = useState<string | null>(null);
  const [attStatus,setAttStatus] = useState<boolean|null>(null);
  const getAttendanceData = async () => {
    try {
      const response = await axios.get(`/api/getattendances?cid=${id}`);
      if (response.status === 200) {
        console.log(response.data.records);
        setdata(response.data.records)
      }
    } catch (error) {
      console.log("Failed to perform the functionnality");
      if (error instanceof AxiosError) {
        console.log("Err=>" + error.response?.data.error);
        toast.error(error.response?.data.error)
      }
    }
  }

  useEffect(() => {
    const display = async () => {
      await getAttendanceData();
    }
    display();
  }, []);


  //apply the onclick event to it and to that event pass the id of that record
  const fetchingStatus =(id:string)=>{
    try {
      data.map((d:Data)=>{
        if(d._id === id){
          setAttStatus(d.Status);
        }
      })
    } catch (error) {
      console.log("Something went wrong!!"+error);

    }
  }

  const onUpdateStatus =async(id:string,status:boolean)=>{
    try {
      
      const response = await axios.put(`/api/updatestatus?id=${id}`,{status});
      if(response.status===200){
        toast.success("Successfully updated the status..Kindly refresh for checking update!!");
        
      }

    } catch (error) {
      console.log("Failed to perform the functionality"+error);
      if(error instanceof AxiosError){
        console.log("err=>"+error.response?.data.error)
        toast.error(error.response?.data.error);
      }
      
    }
  }

  return (
    <div>
      <Navbar />
      {
        data.length===0?
        <p className='flex justify-center items-center h-screen font-bold '>No Record Found!!</p>
        :
        
      <section className="min-h-screen relative top-[10vh] bg-gray-50">

        <section className="m-4">
          <h2 className="p-2 text-2xl md:text-4xl font-bold text-center">
            Attendance History & Monitoring
          </h2>

          <h4 className="text-red-500 text-lg md:text-xl font-light animate-pulse text-center mt-2">
            No Classes on Sunday&apos;s !!
          </h4>
        </section>

        <main className="w-full p-4">
  <section className="flex overflow-x-auto gap-3 px-2 py-4 no-scrollbar w-full">
    {data.map((d: Data, index: number) => (
      <div
        onClick={() => {
          setSelectedIndex(index);
          fetchingStatus(d._id);
          setAttId(d._id);
        }}
        key={d._id}
        className={`flex-shrink-0 min-w-[110px] text-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-sm text-sm font-medium
          ${selectedIndex === index
            ? d.Status
              ? "bg-green-600 text-white shadow-md scale-105"
              : "bg-red-600 text-white shadow-md scale-105"
            : "bg-white border border-gray-200 hover:bg-gray-100"
          }
        `}
      >
        {d.Date}
      </div>
    ))}
  </section>
</main>

        <section className="flex justify-center items-center mt-12 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border">

            <div className="text-xl font-semibold text-center mb-4">
              Attendance Status - 
              {attStatus==null?<p className='text-sm'>Kindly click on any of the dates!</p>:attStatus?<span className='text-green-500'>Present</span>:<span className='text-red-500'>Absent</span>}
            </div>

            <div className="text-gray-600 text-center mb-6">
              Update the Status 
             
            </div>

            {attStatus==null?<p className='text-sm text-center'>Status cannot be updated untill clicked on the dates!!</p>:
            <div className="flex justify-center space-x-4">
              <div className=''>
               {attStatus?
               <button onClick={()=>onUpdateStatus(attId!,false)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Absent
              </button>
               :<button onClick={()=>onUpdateStatus(attId!,true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Present
              </button>}
             </div>
            </div>
            }

          </div>
        </section>

      </section>

      }
      <Footer />
    </div>
  );

}

export default Page