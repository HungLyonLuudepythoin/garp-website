"use client";

import React, { useEffect, useState, useRef } from 'react';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import fetchRouteApi from '../lib/map/fetchRoute';
import socket from "@/app/socket";
import displayRoute from '../lib/map/displayRouted';

import goongjs from '@goongmaps/goong-js';

interface MapComponentProps {
  startCoordState: LngLatLike | null;
  endCoordState: LngLatLike | null;
  returnPrice: (handlePriceCalculated: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ startCoordState, endCoordState, returnPrice }) => {
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize the map
  useEffect(() => {
    const initializeMap = async () => {
      try {
        goongjs.accessToken = process.env.NEXT_PUBLIC_KEY_MAP || ''; // Goong API key

        const mapElement = document.getElementById('map');
        if (!mapElement) {
          console.error('Map container with id="map" not found.');
          return;
        }

        const map = new goongjs.Map({
          container: 'map', 
          style: 'https://tiles.goong.io/assets/goong_map_web.json',
          center: [106.6579440875711, 10.756436912008086], 
          zoom: 19
        });

        map.on('load', () => {
          console.log('Map fully loaded');
          mapRef.current = map;
          setIsMapLoaded(true);
        });
      } catch (error) {
        console.error('Error initializing the map:', error);
      }
    };

    if (!mapRef.current) {
      initializeMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const fetchAndDisplayRoute = async () => {
      if (!mapRef.current || !isMapLoaded || !startCoordState || !endCoordState) return;

      try {
        const validateCoords = (coords: LngLatLike): [number, number] | null => {
          if (Array.isArray(coords) && coords.length === 2) {
            const [lng, lat] = coords;
            if (typeof lng === 'number' && typeof lat === 'number') {
              return [lng, lat];
            }
          }
          console.error('Invalid coordinates:', coords);
          return null;
        };

        const validatedStart = validateCoords(startCoordState);
        const validatedEnd = validateCoords(endCoordState);

        if (validatedStart && validatedEnd) {
          const routeData = await fetchRouteApi(validatedStart, validatedEnd);
          if (routeData) {
            const { decodedRoute, startCoords, endCoords, distance, time } = routeData;
            const price = await displayRoute(mapRef.current, decodedRoute, startCoords, endCoords, distance, time);
            returnPrice(price as string);
          }
        }
      } catch (error) {
        console.error('Error fetching or displaying the route:', error);
      }
    };

    fetchAndDisplayRoute();
  }, [startCoordState, endCoordState, isMapLoaded, returnPrice]);

  // Handle driver location updates
  useEffect(() => {
    console.log("red")
    const handleDriverLocation = (data: LngLatLike) => {
      if (mapRef.current) {
        if (!markerRef.current) {
          markerRef.current = new goongjs.Marker({ color: 'red' })
            .setLngLat(data)
            .addTo(mapRef.current);
        } else {
          markerRef.current.setLngLat(data);
        }
      }
    };

    socket.on('receive-driver-location', handleDriverLocation);

    return () => {
      socket.off('receive-driver-location', handleDriverLocation);
    };
  }, []);

  return <div id="map" className="h-[60vh] max-md:h-[80vh] w-full px-2 rounded-md" />;
};

export default MapComponent;
