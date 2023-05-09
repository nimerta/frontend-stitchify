import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const PersonalInfo = ({ navigation, route }) => {
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const PersonalData = {
    fullname: fullname,
    address: address,
    phoneNo: phoneNo,
    selectedGender: selectedGender,
  };
  const onNext = () => {
    if (!fullname || fullname.trim().length === 0) {
      alert("Please enter your full name");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(fullname)) {
      alert("Please enter only letters for your full name");
      return;
    }
    if (!address || address.trim().length === 0) {
      alert("Please enter your address");
      return;
    }
    if (!phoneNo || phoneNo.trim().length === 0) {
      alert("Please enter your phone number");
      return;
    }
    if (!/^\d+$/.test(phoneNo)) {
      alert("Please enter a valid phone number");
      return;
    }
    if (!/^\d{11}$/.test(phoneNo)) {
      alert("phone number length should be 11-digits");
      return;
    }
    if (!selectedGender) {
      alert("Please select your gender");
      return;
    }

    // if (!fullname || fullname === "") {
    //   alert("Please enter your full name");
    //   return;
    // }
    // if (!/^[a-zA-Z ]+$/.test(fullname)) {
    //   alert("Please enter a valid full name");
    //   return;
    // }
    // if (!address || address === "") {
    //   alert("Please enter your address");
    //   return;
    // }
    // if (!phoneNo || phoneNo === "") {
    //   alert("Please enter your phone number");
    //   return;
    // }
    // if (!/^\d+$/.test(phoneNo)) {
    //   alert("Please enter a valid phone number");
    //   return;
    // }
    // if (!selectedGender || selectedGender === "") {
    //   alert("Please select your gender");
    //   return;
    // }
    // All fields are filled, navigate to AccountInfo screen
    navigation.navigate("AccountInfo", { PersonalData });
    setFullName("");
    setAddress("");
    setPhoneNo("");
    setSelectedGender("");
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.mainHeader}>Personal Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Full Name</Text>
        <TextInput
          placeholder="Enter your Name"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setFullName}
          value={fullname}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Address</Text>
        <TextInput
          placeholder="Enter your Address"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setAddress}
          value={address}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Phone Number</Text>
        <TextInput
          placeholder="Enter your Phone No"
          style={styles.inputfield}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPhoneNo}
          value={phoneNo}
        />
      </View>
      <View>
        <Text style={styles.labels}>Gender</Text>
        <View style={styles.pickStyle}>
          <Picker
            style={styles.genderPicker}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }
          >
            {genderOptions.map((selectedGender) => (
              <Picker.Item
                key={selectedGender.value}
                label={selectedGender.label}
                value={selectedGender.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity onPress={onNext} style={styles.btn1}>
        <Text style={styles.btnText}>Next </Text>
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
  bgimg: {
    height: 400,
    width: "100%",
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
    backgroundColor: "#16a085",
    height: "6%",
    width: "35%",
    borderRadius: 18,
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
  pickStyle: {
    // width: 300,
  },
  genderPicker: {
    width: "100%",
    top: -85,
  },
});
export default PersonalInfo;
