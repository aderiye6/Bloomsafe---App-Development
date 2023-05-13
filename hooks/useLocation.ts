import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationAvailable, setLocationAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationAvailable(true);
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } else {
        setLocationAvailable(false);
      }
    })();
  }, []);

  return {
    location,
    locationAvailable,
  };
}
