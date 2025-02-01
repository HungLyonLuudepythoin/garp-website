"use server"
export default async function decodePolyline(encoded: string) {
   const points: [number, number][] = []; // Explicitly define as a tuple array
   let index = 0
   const len = encoded.length;
   let lat = 0, lng = 0;
   while (index < len) {
      let b, shift = 0, result = 0;
   do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
   do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
   } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      points.push([lng * 1e-5, lat * 1e-5]);
   }
   return points;
}