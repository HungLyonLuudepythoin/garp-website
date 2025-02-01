"use server"
import dotenv from "dotenv";

dotenv.config();
import { LngLat, LngLatLike} from "mapbox-gl";
import decodePolyline from "./decoded";

export default async function fetchRouteApi(startCoordState: [number, number], endCoordState: [number, number]) {
  const directionVehicle = 'taxi';
  const apiKey = process.env.API_KEY
  // Validate coordinates and convert them to LngLat objects if they are valid arrays
  const validateLngLat = (coords: LngLatLike): LngLat | null => {
    if (Array.isArray(coords) && coords.length === 2) {
      const [lng, lat] = coords;
      if (typeof lng === 'number' && typeof lat === 'number') {
        return new LngLat(lng, lat);  // Convert to LngLat instance
      }
    }
      console.error("Invalid LngLat coordinates:", coords);
      return null;
    };

    // Validate start and end coordinates
    const startCoord = validateLngLat(startCoordState);
    const endCoord = validateLngLat(endCoordState);
    if (!startCoord || !endCoord) {
      return null;  // Invalid coordinates, return null
    }
    const origin = `${startCoord.lat},${startCoord.lng}`;
    const destination = `${endCoord.lat},${endCoord.lng}`;
    const apiLink = `https://rsapi.goong.io/direction?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&vehicle=${directionVehicle}&api_key=${apiKey}`;
  
    const response = await fetch(apiLink);
    const data = await response.json();
    console.log("API Response:", data);
    if (data.routes && data.routes.length > 0) {
      const route = await data.routes[0].overview_polyline.points;
      const distance = data.routes[0].legs[0].distance.text;
      const time = data.routes[0].legs[0].duration.text;
      const decodedRoute: LngLatLike[] = await decodePolyline(route);
      return {decodedRoute,
        startCoords: `${startCoord.lng},${startCoord.lat}`,
        endCoords: `${endCoord.lng},${endCoord.lat}`,
        distance,
        time
      }
    }
  return null
}
