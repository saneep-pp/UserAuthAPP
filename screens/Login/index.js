// SignInScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet ,TouchableWithoutFeedback} from "react-native";
import { Link } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Login = ({ navigation,onData }) => {
   const [isloggedIn,setIsloggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);

  const handlePress = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePress1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };
  const isValid = () => {
    let isProceed = false;
    if (email === "" || password === null) {
      console.log("Email should not be Empty!");
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "Email should not be Empty!",
      });
    } else if (password === "" || password === null) {
      console.log("Password is Required!");
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "Password is Required!",
      });
    } else {
      isProceed = true;
    }
    return isProceed;
  };

  const signIn = async () => {
    if(isValid){
    try {
      // Retrieve user data from AsyncStorage
      const userDataString = await AsyncStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);

        // Verify email and password
        if (userData.email === email && userData.password === password) {
          // Optionally, you can perform additional authentication logic here
          console.log("User authenticated successfully:", userData);
          isloggedIn=true;
          setTimeout(() => {
            Toast.show({
              type: "success",
              text1: "Signed In",
              text2: "Successfully Signed In",
            });
            navigation.navigate("Home");
          }, 2000);

          // Navigate to the main app screen
          // This is just an example; adjust the navigation logic based on your app's structure
        } else {
          console.log("Invalid credentials");

          Alert.alert("Error", "Invalid email or password");
        }
      } else {
        console.log("User data not found");
        Alert.alert("Error", "User not found. Please sign up.");
      }
      console.log(userDataString);
    } catch (error) {
      console.error(error.message);
    }
  }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} onBlur={handleBlur}>
      
      <View style={styles.container}>
        <Toast/>
        <View
          style={{
            padding: 5,
            borderWidth: 1,
            width: "80%",
            borderColor: isFocused ? "blue" : "gray",
          }}
        >
          <TextInput
            onFocus={handlePress}
            onBlur={handleBlur}
            style={{ height: 30 }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            padding: 5,
            borderWidth: 1,
            width: "80%",
            borderColor: isFocused1 ? "blue" : "gray",
          }}
        >
          <TextInput
            onFocus={handlePress1}
            onBlur={handleBlur1}
            style={{ height: 30 }}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ width: "80%" }}>
          <Button title="Sign In" onPress={signIn} />
        </View>
        <Text>
          Don't have an account? <Link to={{ screen: "SignUp" }}>SignUp</Link>{" "}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f6f6f6f",
    gap: 20,
  },
});
