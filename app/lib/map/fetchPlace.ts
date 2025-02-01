"use server"

import { LngLatLike } from "mapbox-gl";
import dotenv from "dotenv";

dotenv.config();
export default async function fetchPlaceAPI(placeId: string) {
  const apiKey = process.env.API_KEY
  console.log("API duoc kich hoat")
  const apiLink = `https://rsapi.goong.io/place/detail?api_key=${apiKey}&place_id=${placeId}`;
  try {
    const res = await fetch(apiLink)
    const data = await res.json()
    const { location } = data.result.geometry;
    const lngLat: LngLatLike = [location.lng, location.lat];
    return lngLat
  } catch (err) {
    console.error(err)
  }

}