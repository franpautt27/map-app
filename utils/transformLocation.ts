import { LocationObject } from "expo-location";
import {Region} from 'react-native-maps'


export const transformLocation = (locationInput: LocationObject ) => {
    const locationOutput: Region = {
        latitude: locationInput.coords.latitude,
        latitudeDelta: 0.005,
        longitude: locationInput.coords.longitude,
        longitudeDelta: 0.005
    }
    return locationOutput;
}