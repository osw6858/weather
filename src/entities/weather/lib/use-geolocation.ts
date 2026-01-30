import { useState, useEffect, useCallback } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [error, setError] = useState<GeolocationPositionError | string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('지원하지 않는 브라우저');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: Math.round(pos.coords.latitude * 10000) / 10000,
          lon: Math.round(pos.coords.longitude * 10000) / 10000,
        });
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPosition();
  }, [getPosition]);

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        result.onchange = () => {
          if (result.state === 'granted') {
            getPosition();
          }
        };
      });
    }
  }, [getPosition]);

  return { coords, error, isLoading, refetch: getPosition };
};
