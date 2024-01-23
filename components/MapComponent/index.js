// MapWithSearch.js

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapWithSearch = () => {
  const [location, setLocation] = useState("");
  // LocationData.js

  const karnatakaLocations = [
    {
      name: "Bengaluru",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      name: "Mysuru",
      latitude: 12.2958,
      longitude: 76.6394,
    },
    {
      name: "Hubballi",
      latitude: 15.3647,
      longitude: 75.124,
    },
    {
      name: "Mangaluru",
      latitude: 12.9141,
      longitude: 74.856,
    },
    {
      name: "Belagavi",
      latitude: 15.8497,
      longitude: 74.4977,
    },
    // Add more locations as needed
  ];

  const [coordinates, setCoordinates] = useState({
    latitude: 12.9716, // Default to Bengaluru's coordinates
    longitude: 77.5946,
  });

  const handleSearch = () => {
    // Find the location in the array by name (case-insensitive)
    const selectedLocation = karnatakaLocations.find(
      (loc) => loc.name.toLowerCase() === location.toLowerCase()
    );

    if (selectedLocation) {
      setCoordinates({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    } else {
      // Display an alert if the location is not found
      Alert.alert("Location Not Found", "Please enter a valid location name.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapView
        style={{ height: 300, width: "80%" }}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={coordinates} title="Selected Location" />
        {karnatakaLocations.map((loc) => (
          <Marker
            key={loc.name}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.name}
          />
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter location name"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "85%",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    padding: 5,
  },
});

export default MapWithSearch;
