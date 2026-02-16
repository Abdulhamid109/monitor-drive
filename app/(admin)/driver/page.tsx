import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar/>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Driver Details
            </h2>

            <form className="space-y-5">
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
                  placeholder="Enter Driver Phone no"
                />
              </div>
              <div>
                <label htmlFor="enroll" className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Type
                </label>
                <input
                  type="text"
                  id="enroll"
                  name="enroll"
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Enrollment type : eg:Car , eg:bike"
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
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the days (eg:Intial Day is considered as 0)"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                Add Detail
              </button>
            </form>

            
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
