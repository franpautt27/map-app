import { StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Region, Marker } from "react-native-maps";
import useDebuncedRegionData from "../hooks/useDebuncedRegionData";
interface Props {
  onDebounce: (regionValue: Region) => void;
  initialRegion: Region;
  mapRef?: any;
  showLocationsOfInterest: () => React.JSX.Element[]
}

const MapComponent = (props: Props) => {
  const { onDebounce, initialRegion, mapRef, showLocationsOfInterest } = props;

  const [currentRegion, setCurrentRegion] = useState<Region>(initialRegion);
  const onRegionChange = (region: Region) => {
    setCurrentRegion(region);
  };

  const debouncedRegion = useDebuncedRegionData(currentRegion);
  useEffect(() => {
    onDebounce(debouncedRegion);
  }, [debouncedRegion]);

  return (
    <MapView
      ref={mapRef}
      initialRegion={currentRegion}
      onRegionChangeComplete={onRegionChange}
      style={styles.map}
    >
      {showLocationsOfInterest()}
      <Marker
        coordinate={{
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
        }}
        title="Your Location"
      />
    </MapView>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  map: { width: "100%", height: "100%" },
});
