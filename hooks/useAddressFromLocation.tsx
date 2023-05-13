import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useAddressFromLocation(
  latitude: string,
  longitude: string
) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let address = await Location.reverseGeocodeAsync({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        });

        let addressText = `${address[0].streetNumber || ''} ${
          address[0].street || ''
        } ${address[0].district || ''} ${address[0].city || ''} ${
          address[0].region || ''
        } ${address[0].country || ''} ${address[0].postalCode || ''}`;

        setAddress(addressText);
      }
    })();
  }, [longitude, latitude]);

  return { address };
}
