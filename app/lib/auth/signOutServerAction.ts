"use server"

import { signOut } from "./authConfig"

export const HandleSignOut = async () => {
  await signOut()
}