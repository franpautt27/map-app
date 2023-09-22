import React, { useRef } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import useUserLocation from "./hooks/useUserLocation";
import MapView, { Region } from "react-native-maps";
import useDebuncedRegionData from "./hooks/useDebuncedRegionData";
import MapComponent from "./components/MapComponent";
import { transformLocation } from "./utils/transformLocation";

export default function App() {
  const { text, outputLocation } = useUserLocation();
  const mapRef = useRef<any>(null);
  

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  const goToUserLocation = () => {
    mapRef.current.animateToRegion(outputLocation, 1000);
  };

  if (!outputLocation)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  if (text.includes("denied"))
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Button title="Go to user's location" onPress={goToUserLocation} />
      <View style={styles.mapConainer}>
        <MapComponent
          mapRef={mapRef}
          initialRegion={outputLocation}
          onDebounce={onRegionChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  mapConainer: { height: "70%", width: "100%", marginTop: 50 }
});
