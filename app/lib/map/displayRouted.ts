import mapboxgl,{ LngLatLike } from 'mapbox-gl';
import goongjs from '@goongmaps/goong-js';
import { calculatePrice } from './calculatedPrice';

const activeMarkers: mapboxgl.Marker[] = []; // Global array to track markers
let activePopup: mapboxgl.Popup | null = null; // Track the active popup

async function displayRoute(map: mapboxgl.Map,
  route: LngLatLike[],
  startCoords: string,
  endCoords: string,
  distance: string,
  time: string) {
  if (!map) {
    console.error("Map object is undefined");
    return;
  }
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  }

  // Remove the old popup if it exists
  if (activePopup) {
    activePopup.remove();
    activePopup = null;
  }
  activeMarkers.forEach((marker) => {
    marker.remove()
  });
  console.log(activeMarkers)
  console.log(startCoords)
  console.log(endCoords)
    // Parse start and end coordinates
    const parseCoords = (coords: string): [number, number] => {
      const parsed = coords.split(',').map(x => Number(x));
      if (parsed.length === 2 && typeof parsed[0] === 'number' && typeof parsed[1] === 'number') {
        return [parsed[0], parsed[1]];
      }
      throw new Error(`Invalid coordinates: ${coords}`);
    };
  
    const longLatStart = parseCoords(startCoords);
    const longLatEnd = parseCoords(endCoords);
    console.log(longLatStart)
    console.log(longLatEnd)
  // Helper to add markers
  const addMarker = (coords: [number, number], label: string) => {
    const marker = new goongjs.Marker().setLngLat(coords);
    marker.setPopup(new goongjs.Popup().setHTML(label));
    marker.addTo(map);
    console.log("Add marker")
    activeMarkers.push(marker); // Track the marker
  };

  // Add markers for start and end locations
  addMarker(longLatStart, "Bắt đầu");
  addMarker(longLatEnd, "Kết thúc");

  const midPoint = route[Math.floor(route.length / 2)];
  const price = await calculatePrice(distance)
  activePopup = new goongjs.Popup()
  .setLngLat(midPoint)
  .setHTML(`<p>Khoảng cách: ${distance}</p> <p>Thời gian: ${time}</p> <p>Giá rẻ: ${price}</p>`)
  .addTo(map);
  // Fit the map to the bounds of the route
 map.fitBounds(
  route.reduce(
    (bounds, coord) => bounds.extend(coord),
    new goongjs.LngLatBounds(route[0], route[0])
  ),
  { padding: 20 }
  );
  return price
}

export default displayRoute