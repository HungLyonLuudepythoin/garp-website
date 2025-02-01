"use server";
import { auth } from "../auth/authConfig";
import { pool } from "../postgres";
interface LocationData {
  startPlace: string;
  endPlace: string;
  phoneNumber: string;
  menu: string;
  price: string;
}
export default async function saveData (data:LocationData) {
 const session = await auth()
 const {startPlace, endPlace, phoneNumber, menu, price} = data
 try {
  const query = `
  INSERT INTO customers ( name, email, startPlace, endPlace, phoneNumber, menu, price)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  await pool.query(query, [session?.user?.name, session?.user?.email ,startPlace, endPlace, phoneNumber, menu, price]);
 } catch (err) {
  console.error(err)
 }
}