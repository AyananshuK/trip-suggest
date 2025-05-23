import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import heroImg from '@/assets/heroImg.png'

const Hero = () => {
  return (
    <div className='container mx-auto'>
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className='font-extrabold text-[30px] md:text-[60px] text-center mt-16'>
                Discover Your Perfect Destinations<br/><span className='text-[#f56551]'>Effortlessly!</span>
            </h1>
            <p className='text-lg text-gray-500 text-center my-10'>
                Get inspired by intelligent trip suggestions tailored just for you. Your next unforgettable adventure is just a tap away.
            </p>
            <Link to={'/create-trip'}><Button >Get Started</Button></Link>
        <img src={heroImg} alt="" className='mt-18 mb-10 h-[400px] w-[720px]'/>
        </div>
    </div>
  )
}

export default Hero
