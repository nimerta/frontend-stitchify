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
import { useState, useEffect, useIsFocused } from "react";
import axios from "axios";

import Ip from "../IPConfigration";
const EditProfile = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState();
  var { updatedUser } = route.params;
  // require("../../Stitchify/Images/2piece.jpg")
  const [fullname, setFullname] = useState(
    updatedUser !== null ? updatedUser?.full_name : "Nimerta bai"
  );
  const [phoneNumber, setPhoneNumber] = useState("03124567892");
  const [email, setEmail] = useState("Nimerta bai");
  const [gender, setGender] = useState("Female");
  const [userImage, setUserImage] = useState("");

  const [updatedUserState, setUpdatedUserState] = useState(
    updatedUser !== null ? updatedUser : null
  );

  const [userId, setUserId] = useState(route.params.data);
  // const isFocused = useIsFocused();

  const OnDetails = () => {
    navigation.navigate("DetailsScreen", { data: userId });
  };
  const OnAddressDetails = () => {
    navigation.navigate("EditAddressScreen");
  };

  var getUserData = async () => {
    var apiResponse = await axios
      .get(`http://${Ip.mainIp}/api/user/get-user/${userId}`)
      .then((onUserFound) => {
        // console.log("on user found: ", onUserFound.data);
        // console.log("full name: ", onUserFound.data.user.full_name);
        setFullname(onUserFound.data.user.full_name);
        setEmail(onUserFound.data.user.email_address);
        setPhoneNumber(onUserFound.data.user.phone_no);
        setGender(onUserFound.data.user.gender);
        setUserImage(onUserFound.data.user.image.url);
        console.log("jfdgfj: ", onUserFound.data.user.image.url);
      })
      .catch((onUserFoundError) => {
        console.log("on user found error: ", onUserFoundError);
      });
  };

  useEffect(() => {
    console.log("route data: ", route.params);
    console.log("user id: ", userId);
    getUserData();
    setInterval(() => {
      getUserData();
    }, 2000);
    console.log(" jkfdgskjfsdhgkjs");
    console.log("updated user: ", updatedUserState);

    if (updatedUserState !== null) {
      console.log("updated user:");
      // Fetch the profile data from the API
      getUserData();
    }
  }, []);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ProfileContainer}>
        <View style={styles.Profile}>
          <Image
            style={styles.ProfileImg}
            source={{
              uri:
                userImage !== ""
                  ? userImage
                  : "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png",
            }}
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
          <Text style={styles.DetailsTxt}>{fullname}</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Email</Text>
          <Text style={styles.DetailsTxt}>{email}</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Gender</Text>
          <Text style={styles.DetailsTxt}>{gender}</Text>
        </View>
        <View style={styles.DetailsBox}>
          <Text style={styles.SubheadingStyle}>Phone Number</Text>
          <Text style={styles.DetailsTxt}>{phoneNumber}</Text>
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
