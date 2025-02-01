"use server"

import { pool } from "../postgres"
import { auth } from "./authConfig"

export const unLinkGoogleAccount = async () => {
  const session = await auth()
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized")
  }
  const uuid: string = session.user.id

  // Sanitize input
  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    throw new Error("Invalid UUID");
  }


  try {
    await pool.query(
      "DELETE FROM accounts WHERE provider = 'google' AND \"userId\" = $1",
      [uuid]
    );
    return true;
  } catch (error) {
    console.error("Failed to unlink Google account:", error);
  }

}