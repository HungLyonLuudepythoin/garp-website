"use server"
import dotenv from "dotenv";

dotenv.config();
import { LngLatLike } from "mapbox-gl";

const normalizeLngLat = (coord: LngLatLike): [number, number] => {
  if (Array.isArray(coord)) {
    return coord; // Already in [longitude, latitude] format
  } else if (typeof coord === "object" && "lng" in coord && "lat" in coord) {
    return [coord.lng, coord.lat]; // Convert {lng, lat} to [longitude, latitude]
  } else {
    throw new Error("Invalid LngLatLike format");
  }
};
export default async function calculateDistance(coord1: LngLatLike, coord2: LngLatLike) {
  const toRadians = (deg: number) => deg * (Math.PI / 180);
  const [lat1, lon1] = normalizeLngLat(coord1)
  const [lat2, lon2] = normalizeLngLat(coord2)
  const R = 6371e3; // Earth radius in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};