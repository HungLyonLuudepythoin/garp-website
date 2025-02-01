import Link from 'next/link'
import React from 'react'
import { RxExclamationTriangle } from 'react-icons/rx'

const page = () => {
  return (
    <div className='auth-page'>
      <div className="auth-card">
        <div className="grid grid-cols-[auto_1fr] py-4 px-2 mb-4 place-items-center bg-red-200 text-red-500 rounded-2xl">
          <RxExclamationTriangle className='auth-icon' />
          <p>Oops, something went wrong.</p>
        </div>
        <p className=''>Error! Please try again. 
          <Link className='hover:underline hover:text-red-500' href="/api/auth/signin">Click here</Link>
        </p>
      </div>    
    </div>
  )
}

export default page