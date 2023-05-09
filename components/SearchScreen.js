import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Search</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textstyle: {
    fontSize: 12,
  },
});
export default SearchScreen;
