// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home";
import Toast from "react-native-toast-message";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Map" component={MapComponent} />
  </Stack.Navigator>
);
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SignIn" component={Login}></Stack.Screen>
    <Stack.Screen name="SignUp" component={Signup} />
  </Stack.Navigator>
);
const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleData = (data) => {
    setIsLogged(data);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="SignIn" component={AuthStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
