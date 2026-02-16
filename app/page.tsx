import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <Navbar/>

      <main className="min-h-screen flex flex-col justify-center items-center gap-6 px-4 md:gap-8 md:px-8">
      <section className="text-center max-w-3xl">
        <h1 className="md:text-6xl bg-gradient-to-b from-gray-800 to-gray-500 bg-clip-text text-transparent text-3xl font-bold mb-2">
          Monitor Drive
        </h1>
        <p className="md:text-2xl font-light text-gray-600 tracking-tight">
          A place where you learn about the art of driving
        </p>
      </section>
      <section>
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md">
            Get Started
          </button>
        </Link>
      </section>
    </main>

      <Footer/>
    </div>
  )
}

export default Home