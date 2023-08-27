import axios from "axios";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import mainIp from "../IPConfigration";

const AccountInfo = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { PersonalData } = route.params;

  const AccountData = {
    personalData: PersonalData,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  const signUpNavigation = () => {
    navigation.navigate("PersonalInfo");
  };
  const handleSubmit = () => {
    if (!email || email === "") {
      alert("Please enter your email");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    } else if (
      !password ||
      password === "" ||
      !confirmPassword ||
      confirmPassword === ""
    ) {
      alert("Please enter all required fields");
      return;
    } else if (password.length < 8) {
      alert("Password should be at least 8 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      alert("Password should contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      alert("Password should contain at least one lowercase letter");
      return;
    } else if (!/\d/.test(password)) {
      alert("Password should contain at least one number");
      return;
    } else if (!/[!@#$%^&*(),.?:{}|<>]/.test(password)) {
      alert("Password should contain at least one special character");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      setShowModal(true);
      console.log("in else condition");
    }
  };

  const registerUser = async () => {
    setShowModal(false);
    console.log(" personal data with account: ", AccountData);
    var bodyData = {
      email: email,
      full_name: PersonalData.fullname,
      password: password,
      phone_no: PersonalData.phoneNo,
      gender: PersonalData.selectedGender,
      address: PersonalData.address,
    };

    console.log("body data: ", bodyData);

    console.log("main ip :", mainIp);
    console.log(`${mainIp}/api/user/sign-up`);
    var apiResponse = await axios
      .post(`http://${mainIp.mainIp}/api/user/sign-up`, bodyData)
      .then(async (onSubmit) => {
        console.log("on submit ", onSubmit.data);
        if (onSubmit.data.alreadyExists) {
          alert(onSubmit.data.message);
        } else {
          alert("Account created successfully");
          navigation.navigate("Login");
        }
      })
      .catch(async (onSubmitError) => {
        alert("Something went wrong!");

        console.log("on submit error: ", onSubmitError.response);
      });
  };

  const registerUserAndNavigate = async () => {
    console.log("personal data with account: ", AccountData);
    var bodyData = {
      email: email,
      full_name: PersonalData.fullname,
      password: password,
      phone_no: PersonalData.phoneNo,
      gender: PersonalData.selectedGender,
      address: PersonalData.address,
    };

    console.log("body data: ", bodyData);

    console.log("main ip :", mainIp);
    console.log(`${mainIp}/api/user/sign-up`);
    var apiResponse = await axios
      .post(`http://${mainIp}/api/user/sign-up`, bodyData)
      .then(async (onSubmit) => {
        console.log("on submit ", onSubmit.data);
        var user_id = onSubmit.data.savedUser._id;
        console.log("user id:", user_id);

        alert("Account created successfully");
        navigation.navigate("Measurement", user_id);
      })
      .catch(async (onSubmitError) => {
        alert("Something went wrong!");

        console.log("on submit error: ", onSubmitError.response);
      });
  };
  //
  // };
  // const onRegistration = () => {
  //   navigation.navigate("popup", { email, password, confirmPassword });
  // };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalView1}>
          <View style={styles.modalView2}>
            <Text>Do you want to submit your measurement?</Text>
            <View style={styles.modalText}>
              <TouchableOpacity onPress={() => registerUser()}>
                <Text>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("1");
                  registerUserAndNavigate();
                  setShowModal(false);
                }}
              >
                <Text>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {/* <Text style={styles.mainHeader}>Create an account</Text> */}
        <Text style={styles.mainHeader}>Account Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          placeholder="Enter your Email"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Password</Text>
        <TextInput
          placeholder="Enter your Password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          //onChangeText={setConfirmPassword}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity onPress={signUpNavigation} style={styles.btn1}>
          <Text style={styles.btnText}>Back </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={styles.btn2}
        >
          <Text style={styles.btnText}>Submit </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalView1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
    paddingVertical: 400,
    paddingHorizontal: 70,
  },
  modalView2: {
    backgroundColor: "white",
    padding: 20,
    height: 150,
  },
  modalText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  mainHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    paddingVertical: "5%",
  },
  inputContainer: {
    width: "100%",
    height: "12%",

    // borderTopLeftRadius: "130",
    // paddingTop: "100",
    Display: "flex",
    marginVertical: "2%",
  },
  labels: {
    fontSize: 20,
    color: "black",
    marginLeft: "4%",
    marginBottom: "2%",
    // marginTop: "2%",
  },
  inputfield: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: "5%",
    width: "95%",
    marginLeft: "2%",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 80,
  },
  btn1: {
    backgroundColor: "#95a5a6",
    height: 50,
    width: "35%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    // marginLeft: "2%",
  },
  btn2: {
    backgroundColor: "#16a085",
    height: 50,
    width: "35%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    // marginLeft: "2%",
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default AccountInfo;
