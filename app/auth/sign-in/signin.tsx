"use client"
import { handleEmailSignIn } from "@/app/lib/auth/emailSignInServerAction"
import { handleGoogleSignIn } from "@/app/lib/auth/googleSingInUSerAction"
import React, { useState, useTransition } from "react"
import { FcGoogle } from "react-icons/fc"

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({email: "" as string})
  const [isPending, startTransition] = useTransition()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try { 
      startTransition( async () => {
      await handleEmailSignIn(formData.email)
      })
    }
    catch (error) {
      console.error(error)
    }

  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-72 p-6 rounded-xl text-center shadow-md hover:shadow-lg">
        <h1 className="font-bold text-4xl">Sign In</h1>
        <div className="flex flex-col w-full pt-5 items-center">
          <form className="flex flex-col w-full pt-5 items-center" onSubmit={handleSubmit}>
            <input className="border-blue-500 border-2 rounded-sm p-2 w-full" type="email" maxLength={320} placeholder="Email" disabled={isPending} required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({email: event.target.value})
            }}/>
            <button type="submit" className="text-center p-2 mt-3 font-medium hover:cursor-pointer text-black
            bg-blue-500 hover:bg-blue-600 rounded-2xl w-full">Sign in with email</button>
          </form>
          <div className="flex flex-row w-3/4 justify-center items-center py-3">
            <div className="flex-grow h-px bg-gray-500"></div>
            <div className="text-gray-500 p-2"> or </div>
            <div className="flex-grow h-px bg-gray-500"></div>  
          </div>
          <button  className="flex justify-center items-center p-2 font-medium hover:cursor-pointer hover:bg-slate-200 border-black 
          border-2 rounded-2xl bg-transparent w-full" onClick={() => handleGoogleSignIn()}> 
          <FcGoogle className="w-6 h-6 mr-5" />Sign in with Google</button>
        </div>
        
      </div>
      
    </div>
  )
}

export default SignInPage