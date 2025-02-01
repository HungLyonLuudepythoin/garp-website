"use server";
import dotenv from "dotenv";

dotenv.config();
export default async function fetchQueryAutoComplete(query: string) {
  const apiKey = process.env.API_KEY;
  console.log("API da ra")
  const apiLink = `https://rsapi.goong.io/place/autoComplete?api_key=${apiKey}&input=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(apiLink);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.predictions || [];
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    return [];
  }
}