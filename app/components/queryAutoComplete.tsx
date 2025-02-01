import React, { useEffect, useRef, useState } from 'react';
import { LngLatLike } from 'mapbox-gl';
import fetchQueryAutoComplete from '../lib/map/fetchQuery';  
import fetchPlaceAPI from '../lib/map/fetchPlace';

interface Prediction {
  description: string;
  place_id: string;
}

interface QueryAutoCompleteProps {
  placedefault: string;
  onLocationSelect: (lngLat: LngLatLike, description: string) => void;
}

const QueryAutoComplete: React.FC<QueryAutoCompleteProps> = ({ placedefault, onLocationSelect }) => {
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [place, setPlace] = useState(""); // Tracks the input value
  const [isSelecting, setIsSelecting] = useState(false); // Prevents fetch during suggestion selection

  // Update suggestions based on user input
  useEffect(() => {
    if (isSelecting) return; // If a suggestion is being selected, skip fetching suggestions

    const timer = setTimeout(async () => {
      if (place.trim()) {
        console.log("Fetching predictions for:", place);
        const predictions = await fetchQueryAutoComplete(place);
        setSuggestions(predictions || []);
      } else {
        setSuggestions([]);
      }
    }, 800); // Debounce time
    return () => clearTimeout(timer);
  }, [place, isSelecting]); // Dependency array includes 'place' and 'isSelecting'

  const fetchPlaceDetails = async (placeId: string, description: string) => {
    const lngLat = await fetchPlaceAPI(placeId);
    if (lngLat) {
      onLocationSelect(lngLat, description);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelecting(false); // Reset selecting flag to allow fetching suggestions
    setPlace(event.target.value); // Update the input value
  };

  const handleSuggestionClick = async (description: string, placeId: string) => {
    setIsSelecting(true); // Temporarily block suggestions
    setSuggestions([]); // Clear suggestions immediately
    await fetchPlaceDetails(placeId, description); // Fetch place details
    setPlace(description); // Update input value
  };

  return (
    <div>
      <div className="relative z-0 w-full my-5 group">
        <input
          type="text"
          value={place} // Controlled input
          onChange={handleInputChange} // Update on input change
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none 
          dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 
          peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
          rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {placedefault}
        </label>
      </div>
      {Array.isArray(suggestions) && suggestions.length > 0 && (
        <ul className="list-none m-0 p-0">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onMouseDown={() => handleSuggestionClick(suggestion.description, suggestion.place_id)}
              className="p-2 border-b border-gray-300 cursor-pointer hover:bg-slate-300"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
      <p>{place}</p>
    </div>
  );
};

export default QueryAutoComplete;
