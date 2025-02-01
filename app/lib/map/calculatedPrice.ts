"use server"
import dotenv from "dotenv";

dotenv.config();
export async function calculatePrice(distance: string) {
  let price = 0;
  const distanceInKm = parseFloat(distance.replace(' km', '').replace(',', '.')); 
  if (distanceInKm <= 1 || distance.includes(" m")) {
    price = 12500; 
  } else if (distanceInKm <= 2) {
    price = 25000
  } else {
    price = 25000 + (distanceInKm - 2) * 4300; 
  }
  const formattedPrice = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });
  return formattedPrice
}
