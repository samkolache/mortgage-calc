import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-between p-4 items-center'>
      <h1 className='text-2xl'>Simple Mortgage Calculator</h1>
      <p className='text-lg'>Created by <span className='font-semibold text-[#238dc1]'>Sam Kotecha</span></p>
    </nav>
  )
}
