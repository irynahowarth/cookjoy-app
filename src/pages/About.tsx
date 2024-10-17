import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function About({}: Props) {
  return (
    <div className='max-w-2xl sm:max-w-4xl'>
        <h2 className='text-pretty text-4xl font-medium tracking-tighter text-gray-950 sm:text-6xl'>
        CookJoy is your ultimate companion for a delightful culinary experience.
        </h2>
        <div className='mt-6 text-lg/6 text-gray-600'>
          <p className='mb-4'>Offering a vast array of delicious recipes that cater to every taste and dietary preference.</p>
          <p>Whether you're an experienced cook or just starting out, the app provides easy-to-follow instructions, inspiring ideas, and personalized recommendations to make your cooking journey both fun and fulfilling.</p>
        </div>
      
        <div className='my-10 rounded-3xl bg-gray-900 pb-24 pt-28 lg:pt-36 px-12 lg:px-16'>
          <p className='mb-6 text-3xl tracking-tight text-white lg:text-4xl '>Embrace the joy of cooking <br/>and transform your kitchen.</p>
          <Link to="/recipes"  aria-label="Recipes" className='bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent'>Explore our recipes</Link>
        </div>
    </div>
  )
}