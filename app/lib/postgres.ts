import pg from "pg";

const { Pool } = pg;

export const pool = new Pool ({
  host: process.env.AUTH_DATABASE_HOST,
  port:  process.env.AUTH_DATABASE_PORT ? parseInt(process.env.AUTH_DATABASE_PORT, 10) : 5432,
  database: process.env.AUTH_DATABASE_NAME,
  password: process.env.AUTH_DATABASE_PASSWORD,
  user: process.env.AUTH_DATABASE_USER,
})