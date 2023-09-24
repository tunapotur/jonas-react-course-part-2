import { useState, useEffect } from "react";

function useGeolocation(requestCount) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const { lat, lng } = position;

  useEffect(
    function () {
      if (!navigator.geolocation)
        setError("Your browser does not support geolocation");

      if (requestCount > 0) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            setIsLoading(false);
          },
          (error) => {
            setError(error.message);
            setIsLoading(false);
          }
        );
      }
    },
    [requestCount]
  );

  return { lat, lng, isLoading, error };
}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const { lat, lng, isLoading, error } = useGeolocation(countClicks);

  return (
    <div>
      <button
        onClick={() => {
          setCountClicks((count) => count + 1);
        }}
        disabled={isLoading}
      >
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
