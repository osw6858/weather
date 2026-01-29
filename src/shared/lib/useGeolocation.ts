import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      toast('이 브라우저는 위치 정보를 지원하지 않아요', {
        description: '다른 브라우저를 사용해 보세요',
        descriptionClassName: '!text-gray-700 !dark:text-white',
        action: {
          label: '확인',
          onClick: () => {},
        },
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        toast('위치 정보를 가져올 수 없어 서울 날씨를 보여드려요', {
          description: '브라우저 설정에서 권한을 켜주세요',
          descriptionClassName: '!text-gray-700 !dark:text-white',
          action: {
            label: '확인',
            onClick: () => {},
          },
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  return { location };
};
