import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Lottie
          source={require("../../assets/141023-loader-for-vis.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingContainer: {
    width: "70%",
    height: "40%",
    alignSelf: "center",
  },
});
