// SignUp
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

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
        type: 'error',
        text1: 'Warning',
        text2: 'Email should not be Empty!'
      });
    } else if (password === "" || password === null) {
      console.log("Password is Required!");
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Password is Required!'
      });
    } else {
      isProceed = true;
    }
    return isProceed;
  };
  const signUp = async () => {
   
    if (isValid()) {
      console.log("Signup reached");
      try {
        // Save user data locally
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({ email, password })
        );
        setTimeout(()=>{
          Toast.show({
            type: 'success',
            text1: 'Register !',
            text2: 'Successfully Registered'
          });
          navigation.navigate("SignIn");
        },2000);
     
       
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
        <View style={{width:'80%'}}>
        <Button  title="Sign Up" onPress={signUp} />

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: "center",
    justifyContent: "center",
   
    backgroundColor: "#f6f6f6f",
    gap: 20,
  },
});
