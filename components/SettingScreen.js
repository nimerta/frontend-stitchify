import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Ip from "../IPConfigration";
const SettingScreen = ({ navigation, route }) => {
  var [userId, setUserId] = useState(route.params.data);
  var [fullName, setFullName] = useState("");
  var [userImage, setUserImage] = useState("");

  const OnEditProfile = () => {
    navigation.navigate("EditProfile", { data: userId, updatedUser: null });
  };
  const OnResetPassword = () => {
    navigation.navigate("UpdatePassword");
  };
  const OnCart = () => {
    navigation.navigate("AddToCartScreen");
  };
  const OnAddressList = () => {
    navigation.navigate("AddressListScreen", { data: userId });
  };
  const OnMeasurement = () => {
    navigation.navigate("ViewMeasurement");
  };

  var getUserData = async () => {
    var apiResponse = await axios
      .get(`http://${Ip.mainIp}/api/user/get-user/${userId}`)
      .then((onUserFound) => {
        console.log("on user found: ", onUserFound.data);
        console.log("full name: ", onUserFound.data.user.full_name);
        setFullName(onUserFound.data.user.full_name);
        setUserImage(onUserFound.data.user.image.url);
      })
      .catch((onUserFoundError) => {
        console.log("on user found error: ", onUserFoundError);
      });
  };

  useEffect(() => {
    console.log("main settings: ", userId);
    getUserData();
    // setInterval(() => {
    //   getUserData();
    // }, 2000);
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
        <Text style={styles.NameTxt}>{fullName}</Text>
        {/* <Text style={styles.EmailTxt}>Nimerta@gmail.com</Text> */}
      </View>
      <View style={styles.OptionsContainer}>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options} onPress={OnEditProfile}>
            <View style={styles.IconContainer}>
              <Feather name="user" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Edit Profile</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options} onPress={OnResetPassword}>
            <View style={styles.IconContainer}>
              <Feather name="lock" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Reset Password</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options} onPress={OnAddressList}>
            <View style={styles.IconContainer}>
              <Feather name="home" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Address List</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options} onPress={OnMeasurement}>
            <View style={styles.IconContainer}>
              <MaterialCommunityIcons
                name="scissors-cutting"
                size={20}
                color="#16a085"
              />
            </View>
            <Text style={styles.OptionsTxt}>Measurement Profile</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options}>
            <View style={styles.IconContainer}>
              <Octicons name="checklist" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Standard order History</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options}>
            <View style={styles.IconContainer}>
              <Octicons name="checklist" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Custom order History</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={styles.Options} onPress={OnCart}>
            <View style={styles.IconContainer}>
              <Feather name="shopping-cart" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Cart</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.OptionsBox}>
          <TouchableOpacity style={[styles.Options, styles.ContainerOpacity]}>
            <View style={styles.IconContainer}>
              <MaterialIcons name="logout" size={20} color="#16a085" />
            </View>
            <Text style={styles.OptionsTxt}>Logout</Text>
            <View style={styles.RightIconContainer}>
              <AntDesign name="right" size={19} color="#202020" />
            </View>
          </TouchableOpacity>
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
    left: 8,
    // right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 30,
    height: 30,
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
  EmailTxt: {
    color: "#B8B8B8",
    fontSize: 14,
    fontWeight: "300",
  },
  OptionsContainer: {
    marginTop: 120,
    //backgroundColor: "green",
    height: "70%",
  },
  OptionsBox: {
    height: 50,
    width: "100%",
    //backgroundColor: "green",

    // paddingHorizontal: 20,
  },
  Options: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  IconContainer: {
    marginRight: 10,
  },
  RightIconContainer: {
    marginLeft: "auto",
    marginTop: -7,
    //backgroundColor: "yellow",
  },

  OptionsTxt: {
    color: "#202020",
    fontSize: 15,
    fontWeight: "600",
    width: "auto",
    maxWidth: "90%",
    paddingLeft: 10,
  },
  ContainerOpacity: {
    opacity: 0.4,
  },
});
export default SettingScreen;
