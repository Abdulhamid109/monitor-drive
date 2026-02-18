"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
// import ScrollableCalendar from 'react-calender-horizontal';


const page = () => {
    const {id} = useParams();
    //need to get the status -- of the drive.
  return (
    <div>page {id}
    

    </div>
  )
}

export default page