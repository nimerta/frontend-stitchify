import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import OTPTextView from "react-native-otp-textinput";
// import colors from "../color";
import axios from "axios";
import verifiedApiIps from "../IPConfigration";
import { StackActions } from "@react-navigation/native";
import Ip from "../IPConfigration";
const Verification = ({ navigation, route }) => {
  var [otpCode, setOtpCode] = useState("");
  console.log(" kdjsdh00", route.params);

  const sendOtpEmail = async () => {
    console.log("ldjgjhdfgjdfshgjs", route.params);
    console.log(
      `http://${Ip.mainIp}:/api/forgot-password/send-otp-email/${route.params}`
    );
    let apiResponse = await axios
      .get(
        `http://${Ip.mainIp}:/api/forgot-password/send-otp-email/${route.params}`
      )
      .then((res) => {
        if (res.data.status === "200") {
          console.log("fdjsgjhfdsgds");
          alert(res.data.message);
        } else {
          console.log("not sent");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    sendOtpEmail();
    console.log("ksdfhkjdyyeiy5853847547857497");
  }, []);
  // const verifyOtp = () => {
  //   navigation.navigate("UpdatePassword");
  // };
  const verifyOtp = async () => {
    if (otpCode === "") {
      console.log("empty");
    } else if (otpCode.length !== 4) {
      console.log("not equal");
    } else {
      console.log(otpCode);

      let apiResponse = await axios
        .post(
          `http://${verifiedApiIps.homeIP}:4000/api/email/verify-otp/${route.params}`,
          {
            code: otpCode,
          }
        )
        .then((res) => {
          if (res.data.status === "200") {
            console.log(res.data);
            alert(res.data.message);
            // navigation.dispatch(StackActions.replace("Verified"));
            navigation.navigate("UpdatePassword");
          } else if (res.data.status === "400") {
            console.log(res.data);
          } else if (res.data.status === "404") {
            console.log("not found!");
          }
        })
        .catch((error) => {
          alert("OTP Not Verified!");
        });
    }
  };

  const resendOtp = async () => {
    sendOtpEmail();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Verification</Text>
      <Text style={styles.subHeaderText}>
        Enter your verification code that we {"\n"}sent you through your email
      </Text>
      <View style={styles.otpInputContainer}>
        <OTPTextView
          handleTextChange={(e) => {
            setOtpCode(e);
          }}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={4}
          // tintColor={"blueVogue"}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          top: "38%",
          // fontFamily: "Montserrat-medium",
          color: "gray",
          opacity: 0.8,
        }}
      >
        Haven't received the code?{" "}
        <Text
          style={{
            color: "#16a085",
            // fontFamily: "Montserrat-regular",
            fontWeight: "bold",
          }}
          onPress={resendOtp}
        >
          Resend Code
        </Text>
      </Text>

      <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 5,
  },
  instructions: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    color: "#333333",
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
    width: 60,
    color: "#2f2f",
    // fontFamily: "Montserrat-bold",
    fontSize: 20,
  },
  otpInputContainer: {
    marginTop: "70%",
    padding: 18,
  },
  headerText: {
    // fontFamily: "Montserrat-bold",
    marginTop: "30%",
    position: "absolute",
    fontSize: 35,
    marginLeft: 25,
    // color: "blueVogue",
  },
  subHeaderText: {
    position: "absolute",
    marginTop: "50%",
    marginLeft: 25,
    // fontFamily: "Montserrat-medium",
    color: "Lynch",
    opacity: 0.8,
    lineHeight: 22,
  },
  verifyButton: {
    width: "90%",
    height: "7%",
    backgroundColor: "#16a085",
    alignSelf: "center",
    top: "40%",
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    // fontFamily: "Montserrat-medium",
    marginTop: "5%",
    color: "white",
    opacity: 0.8,
    fontSize: 20,
  },
});
