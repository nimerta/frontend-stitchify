import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import SettingScreen from "./SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#BCEBD7",
        tabBarInactiveBackgroundColor: "#16a085",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "#16a085",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconComponent;
          let iconStyle = {};

          if (route.name === "Home") {
            (iconName = "home"),
              (iconComponent = (
                <Icon name={iconName} size={size} color={color} />
              ));
          } else if (route.name === "Search") {
            (iconName = "search"),
              (iconComponent = (
                <Icon name={iconName} size={size} color={color} />
              ));
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
            iconComponent = (
              <Ionicons name={iconName} size={size} color={color} />
            );
          }

          if (focused) {
            iconStyle = {};
          }
          return (
            <View
            //   style={{
            //     borderRadius: 50,
            //     width: 60,
            //     height: 35,
            //     backgroundColor: focused
            //       ? "rgba(255, 0, 0, 0.2)"
            //       : "transparent",
            //     alignItems: "center",
            //     marginTop: 8,
            //   }}
            >
              {iconComponent}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />

      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};
export default BottomNavigator;