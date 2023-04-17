import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

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
      if (!password || password === "") {
        if (!confirmPassword || confirmPassword === "") {
          setShowModal(false);
          alert("Please enter all required filed");
        } else {
          alert("please enter your email");
        }
        return;
      }
    } else if (!password || password === "") {
      if (!confirmPassword || confirmPassword === "") {
        alert("Please enter all required filed");
      } else {
        alert("please enter your password");
      }
      return;
    } else if (!confirmPassword || confirmPassword === "") {
      alert("please enter your confirm password");
      return;
    } else {
      setShowModal(true);
      console.log("in else condition");
      // navigation.navigate("Measurement", { AccountData });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const registerUser = () => {
    setShowModal(false);
    alert("Account created successfully");
    navigation.navigate("Login");
  };
  //
  // };
  // const onRegistration = () => {
  //   navigation.navigate("popup", { email, password, confirmPassword });
  // };

  return (
    <View style={styles.mainContainer}>
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
                  setShowModal(false);
                  navigation.navigate("Measurement", { AccountData });
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
          onChangeText={setEmail}
          keyboardType="email-address"
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Password</Text>
        <TextInput
          placeholder="Enter your Password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          value={confirmPassword}
        />
      </View>
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
  fp: {
    alignItems: "flex-end",
    width: "94%",
  },
  link: {
    color: "black",
    fontSize: 18,
    marginBottom: "5%",
  },
  btn1: {
    backgroundColor: "#95a5a6",
    height: "6%",
    width: "35%",
    borderRadius: "18%",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    // marginLeft: "2%",
    position: "relative",
    top: 100,
    left: 30,
  },
  btn2: {
    backgroundColor: "#16a085",
    height: "6%",
    width: "35%",
    borderRadius: "18%",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    // marginLeft: "2%",
    position: "relative",
    top: 50,
    left: 250,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  accText: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  signText: {
    color: "black",
    fontSize: 18,
    marginVertical: "2%",
  },

  spText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccountInfo;
