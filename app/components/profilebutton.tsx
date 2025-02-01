"use client"

import { getEmail } from "../lib/auth/getEmailServerAction"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet"
import React, { useEffect, useState } from "react"
import Signoutbutton from "./signoutbutton"
import { getAccountLinkStatus } from "../lib/auth/getAccountLinkStatusServerAction"
import { unLinkGoogleAccount } from "../lib/auth/unLinkGoogelAccountServerAction"
import { handleGoogleSignIn } from "../lib/auth/googleSingInUSerAction"
import { getUserName } from "../lib/auth/getUserNameServerAction"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"

const ProfileButton: React.FC = () => {
  
  const [isAccountLinked, setIsAccountLinked] = useState(false)
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")

  const { update } = useSession()
  useEffect(() => {
    const userInfo = async () => {
      const name = await getUserName()
      if (name) {
        setUserName(name)
      }
      try {
        const email = await getEmail()
        if (email) {
        setEmail(email)
      }
      } catch (error) {
        console.error(error)
      }
      
    };   
    const accountLinkStatus = async () => {
      try {
        const accountLinkStatus = await getAccountLinkStatus()
        setIsAccountLinked(accountLinkStatus)
      } catch (error) {
        console.error("Failed to get account link status: ", error);
      }
    }
    accountLinkStatus()
    userInfo()
  }, [])
  return (
    <div className=" items-center">
      <Sheet>
        <SheetTrigger asChild>
            <button className="py-2.5 px-3 me-2 mb-2 text-sm xl:text-sm w-auto max-sm:w-52 font-medium text-gray-900 focus:outline-none 
            bg-white rounded-full border border-gray-400 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 
            focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
            dark:hover:text-white dark:hover:bg-gray-700">{email}</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            <div className="text-2xl font-bold">{username}</div>
            <div className="flex flex-row justify-between w-full">
              <input type="text" className="px-2 rounded-md border" placeholder={"Name"} value={username} onChange={(event) => setUserName(event.target.value)}/>
              <Button variant="ghost" className="" onClick={() => update({name: username})}>Change name</Button >
            </div>
            <button className="w-full border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer 
            hover:bg-red-600 hover:text-red-200" 
            onClick={ isAccountLinked ? async () => {
                await unLinkGoogleAccount().then(() => {
                    setIsAccountLinked(false);
                });
                }
                : async () => {
                    await handleGoogleSignIn().then(() => {
                      setIsAccountLinked(true);
                    });
                }
            }>
              {isAccountLinked
              ? "Disconnect Google Account"
              : "Connect Google Account"}
            </button>
            <Signoutbutton className="w-full my-3 border-2 border-gray-800 rounded-lg px-3 py-2 text-gray-400 cursor-pointer 
            hover:bg-gray-800 hover:text-gray-200"/>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
} 
export default ProfileButton