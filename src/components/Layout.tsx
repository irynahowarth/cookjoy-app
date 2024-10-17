import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className='overflow-hidden'>
    <div className="relative mx-auto max-w-7xl">
      <div className="absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] rotate-[-10deg] rounded-full blur-3xl"></div>
    </div>
    <Header/>
    <main className='mt-16 px-6 lg:px-8'><Outlet /></main>
    <Footer />
    </div>
  )
}
