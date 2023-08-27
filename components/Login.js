import React, { useState } from "react";
import loginImg from "../Images/mobile.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { mainIp } from "../IPConfigration";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("nimratakumari394@gmail.com");
  const [password, setPassword] = useState("Nimerta123.");
  const data = {
    email: email,
    password: password,
  };

  const signUpNavigation = () => {
    navigation.navigate("PersonalInfo");
  };
  const ForgetPasswordNavigation = () => {
    navigation.navigate("ForgetPassword");
  };

  const handleSubmit = async () => {
    if (!email || email === "") {
      if (!password || password === "") {
        alert("Please enter your email and password");
      } else {
        alert("Please enter your email");
      }
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    } else if (!password || password === "") {
      alert("Please enter your password");
      return;
    } else {
      //alert("Login successful!");
      //navigation.navigate("HomeScreen");
      var bodyData = {
        email: email,
        password: password,
      };

      console.log(`http://${mainIp}/api/user/sign-in`);

      var apiResponse = await axios
        .post(`http://${mainIp}/api/user/sign-in`, bodyData)
        .then(async (onSuccess) => {
          console.log("on success:", onSuccess.data);
          if (onSuccess.data.status === "200") {
            console.log("Login successfully: ");
            alert("Login succesfully");
            navigation.navigate("Main", {
              data: onSuccess.data.singleUser._id,
            });
          } else {
            alert("Invalid email or password");
            console.log("error: ", onSuccess.data);
          }
        })
        .catch(async (onSuccessError) => {
          console.log("on usccess error: ", onSuccessError);
        });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        {/* <Text style={styles.mainHeader}>Login</Text> */}
        <Image style={styles.bgimg} source={loginImg} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          style={styles.inputfield}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Password</Text>

        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.fp} onPress={ForgetPasswordNavigation}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleSubmit();
          console.log("dhdj");
        }}
        style={styles.btn1}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.accText}>
        <Text style={styles.signText}>Doesn't have an account ? </Text>
        <TouchableOpacity onPress={signUpNavigation}>
          <Text style={styles.spText}>signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  bgimg: {
    height: 380,
    width: "100%",
  },
  mainHeader: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "#16a085",
    height: "7%",
    width: "95%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    //marginLeft: "2%",
    alignSelf: "center",
    marginTop: 30,
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

export default Login;
