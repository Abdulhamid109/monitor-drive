"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';


interface Data{
    name:string;
    email:string;
    password:string;
}
export default function SignupPage() {
    const [data,setdata] = useState<Data|null>({
        name:"",
        email:"",
        password:""
    });
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>("");
    const router = useRouter();

    const onhandleSubmit = async(e:React.SubmitEvent) =>{
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post("/api/signup",data);
            if(response.status===200){
                toast.success(response.data.message || "Account Created Successfully");
                router.push("/login")
            }
        } catch (error) {
            console.log("error => "+JSON.stringify(error));
            if(error instanceof AxiosError){
                toast.error(error.response?.data.error)
                console.log("Ax-Er"+JSON.stringify(error))
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
              Instructor Signup
            </h2>

            <form className="space-y-5" onSubmit={onhandleSubmit}>
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  value={data?.name}
                  onChange={(e)=>setdata({...data!,name:e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={data?.email}
                  onChange={(e)=>setdata({...data!,email:e.target.value})}
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
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={data?.password}
                  onChange={(e)=>setdata({...data!,password:e.target.value})}

                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                {loading?<>Loading....</>:<>Signup</>}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
