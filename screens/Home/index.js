import React, { useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({ navigation }) => {

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const dataCheck = async () => {
      // Retrieve user data from AsyncStorage
      const userDataString = await AsyncStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.email === null || userData.email === "") {
          // navigation.navigate('Signup');
          pass
        }
      }
    };
    dataCheck();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to My App</Text>

      <Text style={styles.description}>
        This is a simple home page for your React Native app. You can customize
        it based on your application's needs.
      </Text>
       <View style={{paddingVertical:20}}> 
      <Button title="Open Drawer" onPress={openDrawer} />
      </View>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate("Map")}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  description: {
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 20,
  },
});

export default Home;
