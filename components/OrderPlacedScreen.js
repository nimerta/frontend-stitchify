import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
const OrderPlacedScreen = ({ navigation, route }) => {
  const OnSubmit = () => {
    navigation.navigate("Main", { data: route.params.data });
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.AnimationBox}>
        <Lottie
          // source={require("../../Stitchify/assets/80036-done.json")}
          source={require("../assets/80036-done.json")}
          autoPlay
          loop
        />
      </View>

      <Text style={styles.MsgTxt}>Your order has been{"\n"}placed.</Text>
      <TouchableOpacity style={styles.btn} onPress={OnSubmit}>
        <Text style={styles.btnText}>Go back to Homescreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  // IconContainer: {
  //   width: 160,
  //   height: 160,
  //   backgroundColor: "white",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 80, // Half of the width/height to make it a circle
  // },
  AnimationBox: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  IconStyle: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  MsgTxt: {
    fontSize: 18,
    color: "gray",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#16a085",
    height: 60,
    width: "92%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
