import React, { useRef, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import useUserLocation from "./hooks/useUserLocation";
import { Marker, Region } from "react-native-maps";
import MapComponent from "./components/MapComponent";
import { fetchPointsOfInterest } from "./services/pointsOfInterest";
import { PointOfInterest } from "./interfaces/PointsOfInterest";

export default function App() {
  const { text, outputLocation } = useUserLocation();
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    []
  );
  const mapRef = useRef<any>(null);

  const onRegionChange = async (region: Region) => {
    const resPointsOfInterest = await fetchPointsOfInterest({
      latitude: region.latitude,
      latitudeDelta: region.latitudeDelta,
      longitude: region.longitude,
      longitudeDelta: region.longitudeDelta,
    });
    if (resPointsOfInterest !== undefined) {
      setPointsOfInterest(resPointsOfInterest);
    }
  };

  const showLocationsOfInterest = () => {
    return pointsOfInterest.map((point, index) => {
      return (
        <Marker
          key={index}
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          title={point.title}
          description={point.category}
          icon={{ uri: point.icon }}
        />
      );
    });
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
      <View style={styles.mapContainer}>
        <MapComponent
          showLocationsOfInterest={showLocationsOfInterest}
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
  mapContainer: { height: "70%", width: "100%", marginTop: 50 },
});
