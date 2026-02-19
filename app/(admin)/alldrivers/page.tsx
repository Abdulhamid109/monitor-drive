"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Customer {
  _id: string,
  name: string,
  phone: string,
  days: string

}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    days: ""
  });

  const now = new Date();


  const handleEditClick = (customer: Customer) => {
    console.log(customer._id)
    setEditingId(customer._id);
    setEditFormData({
      name: customer.name,
      phone: customer.phone,
      days: customer.days
    });
  };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("/api/drivers");
      if (response.status === 200) {
        console.log(response.data.message || "Successfully fetched the data");
        console.log("Drivers=>" + response.data.driver)
        setCustomers(response.data.driver);
        toast.success(response.data.message || "Successfully fetched the data");

      }

    } catch (error) {
      console.log("Error : " + error);
      if (error instanceof AxiosError) {
        console.log("Error=>" + error.response?.data.error);
        toast.error(error.response?.data.error);
      }
    }
  }

  useEffect(() => {
    const displayData = async () => {
      await fetchCustomerData();
    }
    displayData();
  }, []);

  const AttendanceStatus = async (cid: string, status: boolean) => {
    try {
      const response = await axios.post(`/api/addattendance?cid=${cid}`, status);
      if (response.status === 200) {
        console.log(response.data.record);
        toast.success(response.data.message + "Kindly Refresh your page");
      }

    } catch (error) {
      console.log("Failed to add the attendance record" + error);
      if (error instanceof AxiosError) {
        console.log("Error=>" + error);
        toast.error(error.response?.data.error)
      }
    }
  }



  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 top-[10vh] relative">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Customer Management</h1>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>


          <div className=" grid md:grid-cols-3 grid-cols-1 gap-5">
            {
              customers.map((cust: Customer) => (
                <div key={cust._id} className='backdrop-blur-xl shadow-2xl shadow-black/60 rounded-md p-2 font-thin bg-gradient-to-r from-pink-200 to-white hover:scale-102 hover:duration-300 hover:transition-all'>
                  <div className='p-2 '>Name : {cust.name}</div>
                  <div className='p-2'>Phone No : {cust.phone}</div>
                  <div className='flex justify-between items-center p-2'>
                    <span>Days Count : {cust.days}</span>
                    <Link href={`/alldrivers/${cust._id}`} className='text-sm underline text-blue-600'>view</Link>
                  </div>
                  <div className='flex justify-between items-center p-2'>
                    {
                      parseInt(cust.days) === 0 ?
                        <>Enrollment Completed</>
                        : now.getDay() === 0 ? <p className='text-red-500 font-semibold'>
                          Sunday&apos;s holiday
                        </p> :
                          <Dialog>
                            <DialogTrigger>
                              <button className='bg-slate-500 p-1 rounded-md text-white'>
                                Add attendance
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle>Mark Your Customer&apos;s Attendance</DialogTitle>
                              <div>
                                Today - {now.toLocaleDateString("en-IN")}
                              </div>
                              <div className='flex justify-between items-center p-2'>
                                <button onClick={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  await AttendanceStatus(cust._id, true)
                                }
                                } className='bg-green-500 rounded-md p-1'><DialogClose>Present</DialogClose></button>
                                <button onClick={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  await AttendanceStatus(cust._id, false)
                                }
                                }
                                  className='bg-red-500 rounded-md p-1'><DialogClose>Absent</DialogClose></button>
                              </div>
                            </DialogContent>
                          </Dialog>
                    }
                    <button className='bg-red-500 p-1 rounded-md text-white'>
                      <Dialog>
                        <DialogTrigger>Delete</DialogTrigger>
                        <DialogContent>
                          <DialogHeader className='text-xl flex justify-center items-center '>Are you sure you want to delete?</DialogHeader>
                          <div className='p-2 flex justify-between items-center'>
                            <button className='bg-red-500 p-2 rounded-md'>Delete</button>
                            <button className='bg-green-500 p-2 rounded-md'><DialogClose>Cancel</DialogClose></button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </button>
                  </div>
                </div>
              ))
            }

            {/* {filteredCustomers.length === 0 && !editingId && (
            <div className="p-4 text-center text-gray-500">
              No customers found matching your search.
            </div>
          )} */}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default CustomersPage;
