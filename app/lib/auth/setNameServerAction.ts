"use server"

import { pool } from "../postgres"
import { auth } from "./authConfig"

export const setName = async (name: string) => {
  const session = await auth()
  if (!session || !session.user?.id) {
    throw new Error ("Unauthorized")
  }
  const uuid: string = session.user.id

  const uuidRegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    throw new Error("Invalid UUID");
  }

  name = name.trim()

  await pool.query(
    "UPDATE users SET name = $1 WHERE id = $2", [name,uuid]
  )
  return true
}