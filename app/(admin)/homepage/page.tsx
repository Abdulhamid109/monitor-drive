import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const AdminHomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 top-[10vh] relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 p-2">Welcome Admin</h1>
          <p className="text-gray-600 p-2">Manage your customers and records efficiently</p>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 top-[12vh] relative">
          
          <Link href="/driver" className="block ">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-300">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Add New Customer</h2>
              </div>
              <p className="text-gray-600 ml-12">Create new customer records </p>
            </div>
          </Link>

          
          <Link href="/alldrivers" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-green-300">
              <div className="flex items-center mb-4 ">
                
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Customer Records</h2>
            </div>
              <p className="text-gray-600 ml-12">View and manage all customer records</p>
            </div>
          </Link>

          {/* Additional cards can be added here */}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default AdminHomePage
