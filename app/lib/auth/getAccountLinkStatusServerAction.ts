"use server"

import { pool } from "../postgres"
import { auth } from "./authConfig"

export const getAccountLinkStatus = async () => {
  const session = await auth()
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized")
  }
  const uuid: string = session.user.id

  // Sanitize input
  const uuidRegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    throw new Error("Invalid UUID");
  }


  try {
    const result = await pool.query(
      "SELECT EXISTS (SELECT 1 FROM accounts WHERE provider = 'google' and \"userId\" = $1)", [uuid]
    )
    if (!result.rows[0].exists) {
      return false
    } 
  } catch (error) {
    console.error("Failed to check if user has Google account linked", error)
  }
  return true
}