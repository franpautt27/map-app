import { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import {Region} from 'react-native-maps'
import { transformLocation } from '../utils/transformLocation';

const useUserLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [outputLocation, setOutputLocation] = useState<Region>()
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setOutputLocation(transformLocation(location))
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg.length > 0) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return {
    text,
    location,
    outputLocation
  }
}

export default useUserLocation