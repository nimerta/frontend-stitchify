import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  AntDesign,
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import EditAddressScreen from "./EditAddressScreen";
import { useState } from "react";
const EditProfile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    require("../../Stitchify/Images/2piece.jpg")
  );

  const OnDetails = () => {
    navigation.navigate("DetailsScreen");
  };
  const OnAddressDetails = () => {
    navigation.navigate("EditAddressScreen");
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ProfileContainer}>
        <View style={styles.Profile}>
          <Image
            style={styles.ProfileImg}
            source={require("../../Stitchify/Images/2piece.jpg")}
          />
        </View>
        <TouchableOpacity style={styles.EditOptionStyle} onPress={OnDetails}>
          <Feather name="edit" size={15} color="#16a085" />
          <Text style={styles.EditTxt}>Edit</Text>
        </TouchableOpacity>
        {/* <Text style={styles.EmailTxt}>Nimerta@gmail.com</Text> */}
      </View>
      <View style={styles.OptionsContainer}>
        <View>
          <Text style={styles.HeadingStyle}>Details</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Fullname</Text>
          <Text style={styles.DetailsTxt}>Nimerta Bai</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Email</Text>
          <Text style={styles.DetailsTxt}>Nimerta@gmail.com</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Gender</Text>
          <Text style={styles.DetailsTxt}>Female</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Phone Number</Text>
          <Text style={styles.DetailsTxt}>03123453214</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  ProfileContainer: {
    height: 180,
    width: "95%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#16a085",
    alignItems: "center",

    alignSelf: "center",
    marginTop: 10,
    paddingTop: 120,
  },
  Profile: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  ProfileImg: {
    width: "96%",
    height: "96%",
    resizeMode: "cover",
    borderRadius: 60,
  },
  AddIconContainer: {
    position: "absolute",
    bottom: 0,
    left: 12,
    // right: 0,
    backgroundColor: "#16a085",
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  NameTxt: {
    color: "#202020",
    fontSize: 17,
    fontWeight: "500",
    paddingVertical: 5,
  },
  EditTxt: {
    color: "#202020",
    fontSize: 14,
    fontWeight: "500",
  },
  OptionsContainer: {
    marginTop: 125,
    //backgroundColor: "green",
    height: "70%",
  },
  EditOptionStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    height: 40,
    width: 70,
    paddingTop: 15,
  },
  HeadingStyle: {
    color: "#16a085",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 15,
    marginVertical: 10,
  },
  DetailsBox: {
    height: 60,
    width: "100%",
    //backgroundColor: "yellow",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 15,
    paddingVertical: 3,
  },
  SubheadingStyle: {
    fontSize: 14,
    color: "#B8B8B8",
    fontWeight: "600",
  },
  DetailsTxt: {
    color: "#202020",
    fontSize: 15,
    fontWeight: "500",
  },
  AddressTxt: {
    color: "#202020",
    fontSize: 15,
    fontWeight: "500",
    width: "auto",
    maxWidth: "85%",
    marginTop: 5,
  },
});
export default EditProfile;
