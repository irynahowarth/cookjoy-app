import React from 'react'

type Props = {}

export default function Reviews({}: Props) {
  return (
    <div className='mt-6 px-4'>
      <h2 className="inline-flex items-center rounded-full px-4 mb-6 py-1 text-pink-600 ring-1 ring-inset ring-pink-600" >
        <span className="font-mono text-sm" aria-hidden="true">03</span>
        <span className="ml-3 h-3.5 w-px bg-pink-600/20"></span>
        <span className="ml-3 text-base font-base tracking-tight">Reviews</span>
      </h2>
      <h2 className='text-2xl font-medium tracking-tight'>Your Reviews</h2>
    </div>
  )
}