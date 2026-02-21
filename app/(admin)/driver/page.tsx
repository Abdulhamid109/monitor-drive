"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';


interface Data {
  name: string;
  phone: string;
  enrollment_type: string;
  days: string;
}
export default function CustomerPage() {
  const [data, setData] = useState<Data | null>({
    name: "",
    phone: "",
    enrollment_type: "",
    days: ""
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pherror,setPhError] = useState<string>("")
  const onhandleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/adddriver", data);
      if (response.status === 200) {
        console.log("Successfully uploaded the data");
        toast.success(response.data.message || "successfully uploaded the data");
        setData({
          name: "",
          enrollment_type: "",
          days: "",
          phone: ""
        });
      }
    } catch (error) {
      console.log("err=>" + JSON.stringify(error));
      if (error instanceof AxiosError) {
        console.log("a-err=>" + error);
        toast.error(error.response?.data.error || "Something went wrong!!")
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 min-h-screen relative top-[5vh]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Driver Details
            </h2>

            <form className="space-y-5" onSubmit={onhandleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Driver Name"
                  value={data?.name}
                  onChange={(e) => setData({ ...data!, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data?.phone}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow only numbers
                    if (!/^\d*$/.test(value)) return;

                    setData({ ...data!, phone: value });

                    if (value.length === 0) {
                      setPhError("");
                    } else if (
                      value.length !== 10 ||
                      !["9", "8", "7"].includes(value[0])
                    ) {
                      setPhError("Phone must be 10 digits and start with 9, 8, or 7");
                    } else {
                      setPhError("");
                    }
                  }}

                  placeholder="Enter Driver Phone no"
                />
                {pherror && (
                  <p className="text-sm font-thin text-red-500 mt-1">
                    {pherror}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="enroll" className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Type
                </label>
                <input
                  type="text"
                  id="enroll"
                  name="enroll"
                  value={data?.enrollment_type}
                  onChange={(e) => setData({ ...data!, enrollment_type: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Enrollment type : eg:Car , eg:bike , eg:Truck"
                />
              </div>
              <div>
                <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
                  Days
                </label>
                <input
                  type="text"
                  id="day"
                  name="day"
                  value={data?.days}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow only numbers
                    if (!/^\d*$/.test(value)) return;

                    setData({ ...data!, days: value });

                    if (value.length === 0) {
                      setError("");
                    } else if (parseInt(value) <= 0) {
                      setError("Days must be greater than 0");
                    } else {
                      setError("");
                    }
                  }}

                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the total time period eg:20"
                />
              </div>
              {error && (
                  <p className="text-sm font-thin text-red-500 mt-1">
                    {error}
                  </p>
                )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                {loading ? <>Adding...</> : <>Add Detail</>}
              </button>
            </form>


          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
