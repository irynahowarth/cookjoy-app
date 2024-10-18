import React from 'react'
import { Link, Outlet } from 'react-router-dom'

type Props = {}

export default function CreateLayout({}: Props) {
  const linkStyles ='inline-block px-4 py-2 text-base hover:bg-black/[2.5%] hover:text-gray-950  hover:border-gray-950 border-transparent  border-b-[1px]'
  return (
    <main className='mt-16 px-6 lg:px-8'>
      <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6">
      <nav className='flex items-center sm:border-b sm:border-gray-200'>
        <Link to="." className={linkStyles}>Dashboard</Link>
        <Link to="./recipes" className={linkStyles}>Recipes</Link>
        <Link to="./reviews" className={linkStyles}>Reviews</Link>
        </nav>
      <Outlet/>
    </div>
   </main>
  )
}
