import { View, Image, StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import HomeScreen from "./components/HomeScreen";
// import spalshPic from "./Images/bg.png";
import spalshPic from "./Images/logonew.png";
import PersonalInfo from "./components/PersonalInfo";
import AccountInfo from "./components/AccountInfo";
import Measurement from "./components/Measurement";
import Loading from "./components/Loaders/Loading";
const Stack = createNativeStackNavigator();

function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Login");
  }, 3000);
  return (
    <View
      style={{
        backgroundColor: "#16a085",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Image source={spalshPic} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <Stack.Navigator initialRouteName="splash_screen">
        <Stack.Screen
          name="splash_screen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Measurement"
          component={Measurement}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
