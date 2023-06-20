import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [address, setaddress] = useState<any>()

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationAvailable(true);
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

      // Convert latitude and longitude to address using reverse geocoding
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if(address){
 const addr = address[0]
 setaddress(addr)
      }
        setLocation(location);
      } else {
        setLocationAvailable(false);
      }
    })();
  }, []);

  return {
    location,
    locationAvailable,
    address
  };
}
