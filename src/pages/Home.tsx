import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function Home({}: Props) {
  return (
    <>
        <div className='mx-auto text-center'>
            <h2 className='mx-auto text-pretty text-4xl font-medium tracking-tighter text-gray-950 sm:text-6xl'>Find Joy in Every Recipe</h2>
            <p className='mx-auto mt-6 max-w-3xl text-lg font-medium text-gray-500 sm:text-2xl'>Discover new favorites, explore creative dishes, and turn everyday cooking into moments of happiness.</p>
        </div>
        <div className='mx-auto text-center mt-6 mb-6'>
           <Link to='/recipes' className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-normal text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'>Find your recipe</Link>
        </div>
    </>
  )
}