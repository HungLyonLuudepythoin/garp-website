import Link from 'next/link'
import React from 'react'
import { RxCheckCircled } from 'react-icons/rx'

const page = () => {
  return (
    <div className='auth-page'>
      <div className="auth-card">
        <div className="grid grid-cols-[auto_1fr] py-4 px-2 mb-4 place-items-center bg-green-200 text-green-500 rounded-md ">
          <RxCheckCircled className='auth-icon'/>
          <p >Success! Please check email inbox for sign in link.</p>
        </div>
        <p>If you didn&apos;t receive an email, please go back to the sign in page and try again. 
          <Link className='hover:underline hover:text-green-500' href="/api/auth/signin"> Click here</Link>
        </p>
      </div>  
    </div>
  )
}

export default page