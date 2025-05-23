import React from 'react'
import Logo from "@/assets/logo.png"
import { Link } from 'react-router-dom'
import HotelCard from './hotelCard'

const Hotels = ({trip}) => {
  return (
    <div className='container mx-auto'>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {trip?.tripData?.hotels?.map((hotel, index)=>(
                <HotelCard hotel={hotel} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels