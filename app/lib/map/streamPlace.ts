import { LngLatLike } from "mapbox-gl";
import calculateDistance from "./calculatedDistance";
import socket from "@/app/socket";

export default function trackLocation() {
  let previousPosition: LngLatLike | null = null;

  if (typeof window === "undefined" || !navigator.geolocation) {
    console.warn("Geolocation is not available in this environment.");
  }

  const watchId = navigator.geolocation.watchPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const currentPosition: LngLatLike = [
        longitude,
        latitude 
      ];

      if (previousPosition) {
        console.log("Sending simulated location:", currentPosition);

        try {
          const distance = await calculateDistance(previousPosition, currentPosition);

          if (distance >= 10) {
            previousPosition = currentPosition;

            // Send location update to the server
            socket.emit("driver-location", currentPosition);
            console.log("Hello");
          }
        } catch (error) {
          console.error("Error calculating distance:", error);
        }
      } else {
        previousPosition = currentPosition; // Initialize the first position
      }
    },
    (error) => {
      console.error("Error tracking location:", error);
    },
    { enableHighAccuracy: true } // Emit updates when the driver moves 10 meters
  );

  return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
}
