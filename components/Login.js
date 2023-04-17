import React, { useState } from "react";
import loginImg from "../Images/mobile.jpg";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    email: email,
    password: password,
  };

  const signUpNavigation = () => {
    navigation.navigate("PersonalInfo");
  };

  const handleSubmit = () => {
    if (!email || email === "") {
      if (!password || password === "") {
        alert("Please enter your email and password");
      } else {
        alert("Please enter your email");
      }
      return;
    } else if (!password || password === "") {
      alert("Please enter your password");
      return;
    } else {
      alert("Login successful!");
      navigation.navigate("HomeScreen", { data });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.mainContainer}>
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

      <View style={styles.fp}>
        <Text style={styles.link}>Forgot password?</Text>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.btn1}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.accText}>
        <Text style={styles.signText}>Doesn't have an account ? </Text>
        <TouchableOpacity onPress={signUpNavigation}>
          <Text style={styles.spText}>signup</Text>
        </TouchableOpacity>
      </View>
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
  bgimg: {
    height: 400,
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
    height: "6%",
    width: "95%",
    borderRadius: "18%",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: "10%",
    marginLeft: "2%",
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
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
