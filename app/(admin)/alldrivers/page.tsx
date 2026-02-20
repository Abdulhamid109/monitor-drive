"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

  const now = new Date();

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("/api/drivers");
      if (response.status === 200) {
        console.log("Successfully fetched the data");
        setCustomers(response.data.driver);
        toast.success(response.data.message || "Successfully fetched the data");
      }
    } catch (error) {
      console.log("Error:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || "Failed to fetch data");
      }
    }
  }

  useEffect(() => {
    const display =async()=>{
      await fetchCustomerData();
    }
    display();
  }, []);

  const AttendanceStatus = async (cid: string, status: boolean) => {
    try {
      const response = await axios.post(`/api/addattendance?cid=${cid}`,status);
      
      if (response.status === 200) {
        console.log(response.data.record);
        toast.success(response.data.message);
        await fetchCustomerData();
      }

    } catch (error) {
      console.log("Failed to add attendance:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || "Failed to mark attendance")
      }
    }
  }

  const DeleteCustomer = async (cid: string) => {
    try {
      const response = await axios.delete(`/api/deletedriver?cid=${cid}`);
      if (response.status === 200) {
        toast.success(response.data.message || "Successfully deleted the user");
        
        setCustomers(prevCustomers =>
          prevCustomers.filter(customer => customer._id !== cid)
        );
      }
    } catch (error) {
      console.log("Error:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || "Something went wrong")
      }
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase().trim();
    
    if (!searchLower) return true;
    
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchLower) ||
      customer.days.toString().includes(searchLower)
    );
  });
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 top-[10vh] relative">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Customer Management
          </h1>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, phone, or days..."
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
              
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-10 top-2.5 sm:top-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-600">
                Found {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            {filteredCustomers.map((cust: Customer) => (
              <div 
                key={cust._id} 
                className='backdrop-blur-xl shadow-2xl shadow-black/60 rounded-md p-2 font-thin bg-gradient-to-r from-pink-200 to-white hover:scale-102 hover:duration-300 hover:transition-all'
              >
                <div className='p-2'>Name: {cust.name}</div>
                <a href={`tel:+91${cust.phone}`} className='p-2'>Phone No: {cust.phone}</a>
                <div className='flex justify-between items-center p-2'>
                  <span>Days Count: {cust.days}</span>
                  <Link href={`/alldrivers/${cust._id}`} className='text-sm underline text-blue-600'>
                    view
                  </Link>
                </div>
                <div className='flex justify-between items-center p-2 gap-2'>
                  {parseInt(cust.days) === 0 ? (
                    <span className='text-green-600 font-semibold text-sm'>
                      Enrollment Completed
                    </span>
                  ) : now.getDay() === 0 ? (
                    <p className='text-red-500 font-semibold text-sm'>
                      Sunday&apos;s holiday
                    </p>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className='bg-slate-500 p-2 rounded-md text-white hover:bg-slate-600 transition-colors text-sm'>
                          Add attendance
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mark Customer&apos;s Attendance</DialogTitle>
                          <DialogDescription>
                            Today - {now.toLocaleDateString("en-IN")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className='flex justify-between items-center p-2 gap-4'>
                          <DialogClose asChild>
                            <button 
                              onClick={async () => {
                                await AttendanceStatus(cust._id, true);
                              }} 
                              className='bg-green-500 rounded-md p-2 text-white hover:bg-green-600 transition-colors flex-1 font-semibold'
                            >
                              Present
                            </button>
                          </DialogClose>
                          <DialogClose asChild>
                            <button 
                              onClick={async () => {
                                await AttendanceStatus(cust._id, false);
                              }}
                              className='bg-red-500 rounded-md p-2 text-white hover:bg-red-600 transition-colors flex-1 font-semibold'
                            >
                              Absent
                            </button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className='bg-red-500 p-2 rounded-md text-white hover:bg-red-600 transition-colors text-sm'>
                        Delete
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className='text-xl text-center'>
                          Are you sure you want to delete?
                        </DialogTitle>
                        <DialogDescription className='text-center'>
                          Customer &quot;{cust.name}&quot; will be permanently deleted.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='p-2 flex justify-between items-center gap-4'>
                        <DialogClose asChild>
                          <button 
                            onClick={async () => {
                              await DeleteCustomer(cust._id);
                            }} 
                            className='bg-red-500 p-2 rounded-md text-white hover:bg-red-600 transition-colors flex-1 font-semibold'
                          >
                            Delete
                          </button>
                        </DialogClose>
                        <DialogClose asChild>
                          <button className='bg-green-500 p-2 rounded-md text-white hover:bg-green-600 transition-colors flex-1 font-semibold'>
                            Cancel
                          </button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}

            {filteredCustomers.length === 0 && (
              <div className="col-span-3 p-8 text-center">
                {searchTerm ? (
                  <div>
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-gray-600 text-lg font-medium">
                      No customers found for &quot;{searchTerm}&quot;
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 text-lg font-medium">
                      No customers available
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Add your first customer to get started
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomersPage;