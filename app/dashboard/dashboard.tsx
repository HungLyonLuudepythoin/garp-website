"use client"

import React, { useEffect, useState } from "react"
import { getUserName } from "../lib/auth/getUserNameServerAction"
import { useRouter } from "next/navigation"
import Header from "../components/header"
import Introduction from "../components/introduction"
import TargetComponent from "../components/targeting"
import PriceComponent from "../components/price"
import { Bike } from "@/public/Bike"
import { Soup } from "lucide-react"
import Image from "next/image"
export const DashboardPage: React.FC = () => {
  const router = useRouter()
  const [username, setUserName] = useState("")
  useEffect(() => {
    const userInfo = async () => {
      const name = await getUserName()
      if (name) {
        setUserName(name)
        console.log(process.env.NEXTAUTH_URL)
      }
    };
    userInfo()   
  }, [])

  return (
    <div className="w-full absolute min-h-screen bg-gradient-to-br from-gray-100 to-zinc-200">
      <Header />
      <div className="relative w-full h-2/3 px-2 max-md:px-4">
        <video 
          src={require('../../public/videos/garpHeader.mp4')} 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover rounded-md"
        />
        <h2 className="absolute top-14 sm:top-24 md:top-36 right-3 text-white text-2xl sm:text-5xl xl:text-7xl px-4 py-2 rounded cursor-default">
          Hello {username}!!
        </h2>
      </div>
      <Introduction />
      <TargetComponent />
      <PriceComponent/>
      <div className="flex flex-row items-center" id='order'>
        <div className="w-1/2 pl-8">
          <Image 
            src="/blob-1-opacity-28.gif" 
            alt="gif" 
            className="object-contain" 
            width={768} 
            height={768} 
          />
        </div>
        <div className="w-1/2">
          <h1 className="md:text-7xl text-4xl text-center font-bold mb-40 max-md:mb-6">The Order</h1>
          <div className="flex flex-row justify-around items-center">
            <div className="text-center">
              <div className="group relative">
                <button
                  onClick={() => router.push("/dashboard/bike")}
                  className="flex items-center justify-center rounded-full border-none outline-none bg-transparent"
                >
                  <Bike className="w-32 h-32 max-md:w-20 max-md:h-w-20 hover:scale-125 duration-200 hover:stroke-blue-500" />
                </button>
                <span
                  className="absolute -top-16 max-md:-top-10 left-1/2 -translate-x-1/2 
                    z-20 origin-left scale-0 px-3 rounded-lg border 
                    border-gray-300 bg-white py-2 text-xl max-md:text-sm font-bold 
                    shadow-md transition-all duration-300 ease-in-out 
                    group-hover:scale-100"
                >
                  Bike
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="group relative">
                <button
                  onClick={() => router.push("/dashboard/food")}
                  className="flex items-center justify-center rounded-full border-none outline-none bg-transparent"
                >
                  <Soup className="w-32 h-32 max-md:w-20 max-md:h-w-20 hover:scale-125 duration-200 hover:stroke-blue-500" />
                </button>
                <span
                  className="absolute -top-16 max-md:-top-10 left-1/2 -translate-x-1/2 
                    z-20 origin-left scale-0 px-3 rounded-lg border 
                    border-gray-300 bg-white py-2 text-xl max-md:text-sm font-bold 
                    shadow-md transition-all duration-300 ease-in-out 
                    group-hover:scale-100"
                >
                  Food
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}