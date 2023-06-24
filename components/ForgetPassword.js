import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Lottie from "lottie-react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Bold } from "react-native-feather";
const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    if (!email || email === "") {
      alert("Please enter your email");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    setShowModal(true);
  };

  const handleModalYes = () => {
    setShowModal(false);
    navigation.navigate("Verification");
  };

  const handleModalNo = () => {
    setShowModal(false);
  };
  return (
    <KeyboardAwareScrollView style={styles.Container}>
      <View style={styles.AnimationBox}>
        <Lottie
          source={require("../../Stitchify/assets/16766-forget-password-animation.json")}
          autoPlay
          loop
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Forget{"\n"}Password</Text>
        <Text style={styles.resetTxt}>
          Enter your email address to reset {"\n"}password
        </Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalContainerRedPart}>
              <View style={styles.modalContainerIcon}>
                <Image
                  style={styles.imgBox}
                  source={require("../../Stitchify/Images/mobile.jpg")}
                />
              </View>
              <Text style={styles.UserNameTxt}>Nimerta bai</Text>
            </View>
            <Text style={styles.modalText}>
              Is this your account? Are you sure you want to proceed?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalNoButton]}
                onPress={handleModalNo}
              >
                <Feather name="x" size={20} color="gray" />
                <Text style={[styles.modalButtonText]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalYesButton, styles.modalButtonYes]}
                onPress={handleModalYes}
              >
                <Feather name="check" size={20} color="white" />
                <Text
                  style={[styles.modalButtonText, styles.modalButtonYesText]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  AnimationBox: {
    height: 350,
    width: 350,
    alignSelf: "center",
  },
  inputContainer: {
    width: "100%",
    height: "18%",

    // borderTopLeftRadius: "130",
    // paddingTop: "100",
    Display: "flex",
    marginVertical: "2%",
  },
  labels: {
    fontSize: 35,
    color: "black",
    marginLeft: "4%",
    marginBottom: "5%",
    marginTop: "2%",
  },
  resetTxt: {
    fontSize: 15,
    color: "gray",
    marginLeft: "4%",
    marginBottom: "5%",
    marginTop: "2%",
    fontWeight: "bold",
  },
  inputfield: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: "5%",
    width: "92%",
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
    marginTop: 220,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingBottom: 20,
  },
  modalContainerRedPart: {
    backgroundColor: "#16a085",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerIcon: {
    height: 75,
    width: 75,
    borderRadius: 35,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  imgBox: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 35,
  },
  UserNameTxt: {
    alignSelf: "center",
    fontSize: 17,
    paddingTop: 10,
    color: "white",
    fontWeight: "bold",

    width: "auto",
    maxWidth: "100%",
  },
  modalContent: {
    backgroundColor: "white",

    borderRadius: 40,
    //justifyContent: "center",
    alignItems: "center",
    height: 310,
    width: 400,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 20,
    textAlign: "center",
    color: "gray",
    fontWeight: "700",
    fontFamily: "Arial",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    //marginTop: 20,
  },
  modalNoButton: {
    //padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#16a085",
    backgroundColor: "transparent",
    width: 115,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modalYesButton: {
    //padding: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
    width: 115,
    height: 55,
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  modalButtonText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    fontFamily: "Arial",
    fontWeight: "700",
    marginLeft: 5,
  },
  modalButtonYes: {
    backgroundColor: "#16a085",
  },
  modalButtonYesText: {
    color: "white",
    fontFamily: "Arial",
    fontWeight: "700",
  },
});
