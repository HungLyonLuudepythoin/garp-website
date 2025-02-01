"use client"

import React from 'react'
import { HandleSignOut } from '../lib/auth/signOutServerAction';

const Signoutbutton = (props: {children?: React.ReactNode; className?: string}) => {
  return (
    <div>
      <button className={props.className} onClick={ async () => {
      await HandleSignOut()
      }}>{props.children || "Sign out" }</button>
    </div>
  )
}

export default Signoutbutton