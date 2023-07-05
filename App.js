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
import BottomNavigator from "./components/BottomNavigator";
import ForgetPassword from "./components/ForgetPassword";
import Verification from "./components/Verification";
import UpdatePassword from "./components/UpdatePassword";
import OrderPlacedScreen from "./components/OrderPlacedScreen";
import EditProfile from "./components/EditProfile";
import DetailsScreen from "./components/DetailsScreen";
import EditAddressScreen from "./components/EditAddressScreen";
import ChangeProfileImageScreen from "./components/ChangeProfileImageScreen";
import AddToCartScreen from "./components/AddToCartScreen";
import AddressListScreen from "./components/AddressListScreen";
import MyCartScreen from "./components/MyCartScreen";
import PaymentScreen from "./components/PaymentScreen";
import ShippingAddressScreen from "./components/ShippingAddressScreen";
import CheckoutScreen from "./components/CheckoutScreen";
import UpdatedMsgScreen from "./components/UpdatedMsgScreen";
import ViewMeasurement from "./components/ViewMeasurement";
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
        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        /> */}
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
        <Stack.Screen
          name="Main"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="UpdatedMsgScreen" component={UpdatedMsgScreen} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAddressScreen"
          component={EditAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangeProfileImageScreen"
          component={ChangeProfileImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddToCartScreen"
          component={AddToCartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
        <Stack.Screen
          name="MyCartScreen"
          component={MyCartScreen}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShippingAddressScreen"
          component={ShippingAddressScreen}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderPlacedScreen"
          component={OrderPlacedScreen}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewMeasurement"
          component={ViewMeasurement}
          //options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
