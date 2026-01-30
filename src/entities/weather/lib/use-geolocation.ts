import { useState, useEffect, useRef, useCallback } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [error, setError] = useState<GeolocationPositionError | string | null>(
    null,
  );
  const watchIdRef = useRef<number | null>(null);

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      setError('지원하지 않는 브라우저');
      return;
    }

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setError(null);
      },
      (err) => setError(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('지원하지 않는 브라우저');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setError(null);
      },
      (err) => setError(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        result.onchange = () => {
          if (result.state === 'granted') {
            startWatching();
          }
        };
      });
    }
  }, [startWatching]);

  return { coords, error, refetch: startWatching };
};
