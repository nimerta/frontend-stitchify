import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Lottie from "lottie-react-native";
import axios from "axios";
import Ip from "../IPConfigration";
const UpdatePassword = ({ navigation, route }) => {
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const OnSubmit = () => {
    if (
      !newpassword ||
      newpassword === "" ||
      !confirmpassword ||
      confirmpassword === ""
    ) {
      alert("Please enter all required fields");
      return;
    } else if (newpassword.length < 8) {
      alert("Password should be at least 8 characters long");
      return;
    } else if (!/[A-Z]/.test(newpassword)) {
      alert("Password should contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(newpassword)) {
      alert("Password should contain at least one lowercase letter");
      return;
    } else if (!/\d/.test(newpassword)) {
      alert("Password should contain at least one number");
      return;
    } else if (!/[!@#$%^&*(),.?:{}|<>]/.test(newpassword)) {
      alert("Password should contain at least one special character");
      return;
    } else if (newpassword !== confirmpassword) {
      alert("Passwords do not match");
      return;
    } else {
      updatePasswordBackend();
      // navigation.navigate("UpdatedMsgScreen");
    }
  };

  const updatePasswordBackend = async () => {
    var bodyData = {
      password: newpassword,
      confirm_password: confirmpassword,
    };
    var apiResponse = await axios
      .patch(
        `http://${Ip.mainIP}/api/forgot-password/update-password/${route.params}`,
        bodyData
      )
      .then((onPasswordUpdate) => {
        console.log("on password update: ", onPasswordUpdate.data);
        if (onPasswordUpdate.data.success) {
          console.log("dsjuhfjhfdsjkuhyg");
          alert(onPasswordUpdate.data.message);

          navigation.navigate("UpdatedMsgScreen");
        } else {
          console.log("kuhdsfuhhkfsdkjhjhkdfs");
          alert("Can not update password");
        }
      })
      .catch((onPasswordUpdateError) => {
        console.log("on password update error: ", onPasswordUpdateError);
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.Container}>
      {/* <View style={styles.AnimationBox}>
        <Lottie
          source={require("../../Stitchify/assets/9068-password.json")}
          autoPlay
          loop={false}
        />
      </View> */}
      <Text style={styles.UpdateHeading}>Update{"\n"}Password</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>New Password</Text>
        <TextInput
          placeholder="Enter New Password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={newpassword}
          onChangeText={setNewPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Confirm Password</Text>
        <TextInput
          placeholder="Enter confirm Password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={confirmpassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={OnSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  AnimationBox: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  UpdateHeading: {
    fontSize: 35,
    color: "black",
    marginLeft: "4%",
    marginBottom: "2%",
    marginTop: "2%",
  },
  inputContainer: {
    width: "100%",
    height: "10%",

    // borderTopLeftRadius: "130",
    // paddingTop: "100",
    Display: "flex",
    marginVertical: "3%",
  },
  labels: {
    fontSize: 15,
    color: "black",
    marginLeft: "5%",
    marginBottom: "2%",
    marginTop: "2%",
  },

  inputfield: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: "5%",
    width: "93%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#16a085",
    height: 60,
    width: "92%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    // marginLeft: "2%",
    alignSelf: "center",
    marginTop: 180,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
