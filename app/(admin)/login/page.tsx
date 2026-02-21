"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';


interface Data{
  email:string;
  password:string;
}

export default function LoginPage() {
  const [data,setData] = useState<Data|null>({
    email:"",
    password:""
  });

  const [loading,setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onhandleSubmit =async(e:React.SubmitEvent)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("/api/login",data);
      if(response.status===200){
        toast.success(response.data.message || "Successfully logged in!");
        router.push("/homepage");
      }
    } catch (error) {
      console.log("Failed to perform the functionality => "+JSON.stringify(error))
      if(error instanceof AxiosError){
        console.log("Error => "+JSON.stringify(error))
        toast.error(error.response?.data.error)
      }
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar/>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Instructor Login
            </h2>

            <form className="space-y-5" onSubmit={onhandleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data?.email}
                  onChange={(e)=>setData({...data!,email:e.target.value})}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data?.password}
                  onChange={(e)=>setData({...data!,password:e.target.value})}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                {loading ? <>loading....</>:<>Login</>}
              </button>
            </form>

            {/* <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
