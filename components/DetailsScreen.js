import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Ip from "../IPConfigration";
const EditProfile = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState();
  // require("../../Stitchify/Images/2piece.jpg")
  const [fullname, setFullname] = useState("Nimerta bai");
  const [email, setEmail] = useState("nimerta@gmail.com");
  const [selectedGender, setSelectedGender] = useState("female");
  const [phoneNo, setPhoneNo] = useState("03123476541");
  const [userImage, setUserImage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(route.params.data);

  const Data = {
    fullname: fullname,
    selectedGender: selectedGender,
    phoneNo: phoneNo,
    email: email,
    profileImage: profileImage,
  };
  const OnSubmit = () => {
    updateProfile();
    // navigation.navigate("EditProfile", { Data });
  };
  //   if (!fullname || fullname.trim().length === 0) {
  //     alert("Please enter your full name");
  //     return;
  //   }
  //   if (!/^[a-zA-Z ]+$/.test(fullname)) {
  //     alert("Please enter only letters for your full name");
  //     return;
  //   }
  //   if (!email || email.trim().length === 0) {
  //     alert("Please enter your email");
  //     return;
  //   }
  //   if (!phoneNo || phoneNo.trim().length === 0) {
  //     alert("Please enter your phone number");
  //     return;
  //   }
  //   if (!/^\d+$/.test(phoneNo)) {
  //     alert("Please enter a valid phone number");
  //     return;
  //   }
  //   if (!/^\d{11}$/.test(phoneNo)) {
  //     alert("phone number length should be 11-digits");
  //     return;
  //   }
  //   if (!selectedGender) {
  //     alert("Please select your gender");
  //     return;
  //   } else {
  //     navigation.navigate("EditProfile");
  //   }
  // };

  const openGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to change the profile image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        // console.log("result assets: ", result.assets[0].base64);

        setProfileImageUri(result.assets[0].base64);
        navigation.navigate("ChangeProfileImageScreen", {
          image: result.assets[0].base64,
          data: userId,
        });
      }
    } catch (error) {
      console.log("Error occurred while accessing the image library:", error);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setProfileImageUri(result.uri);
      navigation.navigate("ChangeProfileImageScreen", result.uri);
    }
  };
  const setProfileImageUri = (uri) => {
    setProfileImage(uri);
    setIsModalOpen(false); // Set isModalOpen to false when profile image is updated
  };
  const deleteProfileImage = () => {
    // setProfileImage(require("../../Stitchify/Images/2piece.jpg"));
    setIsModalOpen(false); // Set isModalOpen to false when profile image is deleted
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setIsModalOpen(false);
  };

  var getUserData = async () => {
    var apiResponse = await axios
      .get(`http://${Ip.mainIP}/api/user/get-user/${userId}`)
      .then((onUserFound) => {
        console.log("on user found: ", onUserFound.data);
        console.log("full name: ", onUserFound.data.user.full_name);
        setFullname(onUserFound.data.user.full_name);
        setEmail(onUserFound.data.user.email_address);
        setPhoneNo(onUserFound.data.user.phone_no);
        setSelectedGender(onUserFound.data.user.gender);
        setUserImage(onUserFound.data.user.image.url);
      })
      .catch((onUserFoundError) => {
        console.log("on user found error: ", onUserFoundError);
      });
  };

  const updateProfile = async () => {
    var bodyData = {
      email_address: email,
      full_name: fullname,
      phone_no: phoneNo,
      gender: selectedGender,
    };
    console.log("body data: ", bodyData);

    var apiResponse = await axios
      .put(`http://${Ip.mainIP}/api/user/update-user/${userId}`, bodyData)
      .then((onUserUpdate) => {
        console.log("on user update: ", onUserUpdate.data);
        alert(onUserUpdate.data.message);
        navigation.navigate("EditProfile", {
          data: userId,
          updatedUser: onUserUpdate.data.updatedDocument,
        });
      })
      .catch((onUserUpdateError) => {
        console.log("on user update error: ", onUserUpdateError);
      });
  };

  useEffect(() => {
    console.log("route data: ", route.params);
    console.log("user id: ", userId);

    console.log("hfhfhfhfhfhffhfh");

    getUserData();
    console.log(" jkfdgskjfsdhgkjs");
  }, []);

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
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
            <TouchableOpacity
              style={styles.AddIconContainer}
              onPress={() => setIsModalOpen(true)}
            >
              <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.OptionsContainer}>
          <View>
            <Text style={styles.HeadingStyle}>Details</Text>
          </View>
          <View style={styles.DetailsBox}>
            <Text style={styles.SubheadingStyle}>Fullname</Text>
            <TextInput
              style={styles.InputField}
              value={fullname}
              onChangeText={setFullname}
            />
          </View>
          <View style={styles.DetailsBox}>
            <Text style={styles.SubheadingStyle}>Email</Text>
            <TextInput
              style={styles.InputField}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.DetailsBox}>
            <Text style={styles.SubheadingStyle}>Gender</Text>
            <TextInput
              style={styles.InputField}
              value={selectedGender}
              onChangeText={setSelectedGender}
            />
          </View>
          <View style={styles.DetailsBox}>
            <Text style={styles.SubheadingStyle}>Phone Number</Text>
            <TextInput
              style={styles.InputField}
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
          </View>
          <TouchableOpacity style={styles.btn1} onPress={OnSubmit}>
            <Text style={styles.btnText}>Save changes</Text>
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={isModalOpen}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={openCamera}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons name="camera" size={24} color="#16a085" />
                      <Text style={styles.modalOptionText}>Take Picture</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={openGallery}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons name="image" size={24} color="#16a085" />
                      <Text style={styles.modalOptionText}>Open Gallery</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={deleteProfileImage}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons name="trash" size={24} color="#16a085" />
                      <Text style={styles.modalOptionText}>Delete Picture</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => setIsModalOpen(false)}
                  >
                    <View style={styles.iconContainer}>
                      <Feather name="x" size={24} color="white" />
                      <Text style={styles.modalOptionText1}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
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
    marginBottom: 10,
    //backgroundColor: "yellow",
  },

  OptionsContainer: {
    marginTop: 115,
    //backgroundColor: "green",
    height: "70%",
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
    height: 95,
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

  InputField: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: "3%",
    width: "95%",
    height: 50,
    color: "#202020",
    fontSize: 15,
    //marginLeft: "2%",
    marginVertical: 10,
  },
  btn1: {
    backgroundColor: "#16a085",
    height: 60,
    width: "92%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 110,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "100%",
    alignSelf: "center",

    //height: 400,
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: 20,
    width: "94%",
    height: 230,
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    //alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  modalOptionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#16a085",
  },
  modalOptionText1: {
    //marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#16a085",
  },
});
export default EditProfile;
