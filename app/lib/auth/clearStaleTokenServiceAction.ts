"use server"

import { pool } from "../postgres"


export const clearStakeTokens = async () => {
  await pool.query("DELETE FROM verification_token WHERE expires < NOW();")
}