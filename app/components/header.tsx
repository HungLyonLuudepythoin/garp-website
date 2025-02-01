import Image from 'next/image'
import React from 'react'
import GARPnobg from '@/public/GARPnobg.png'
import ProfileButton from './profilebutton'
import Link from 'next/link'
const Header = () => {
  return (
    <header className="flex justify-between items-center px-3">
      <Image src={GARPnobg} alt="GrabImg" className='h-auto w-44 max-sm:w-32 hover:scale-105 transition-all cursor-pointer'/>
        <div className="hidden md:flex items-center justify-between gap-40 font-semibold text-sm">
          <Link href="/dashboard#" className='navbar-link'>Home</Link>
          <Link href="/dashboard#order" className='navbar-link'>Booking</Link>
        </div>
        <ProfileButton/>
    </header>
  )
}

export default Header