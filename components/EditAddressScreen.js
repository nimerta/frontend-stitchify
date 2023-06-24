import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const EditAddressScreen = ({ navigation, route }) => {
  const { isEdit } = route.params;
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [instructions, setInstructions] = useState("");

  const areas = ["Area 1", "Area 2", "Area 3"];

  const OnSubmit = () => {
    if (!address || address.trim().length === 0) {
      alert("Please enter your address");
      return;
    }
    if (!area || area.trim().length === 0) {
      alert("Please select your area");
      return;
    }
    if (!street || street.trim().length === 0) {
      alert("Please enter your apartment");
      return;
    }
    if (!city || city.trim().length === 0) {
      alert("Please enter your city");
      return;
    }
    if (!country || country.trim().length === 0) {
      alert("Please enter your address");
      return;
    }
    if (!state || state.trim().length === 0) {
      alert("Please enter your address");
      return;
    }
    if (!zipCode || zipCode.trim().length === 0) {
      alert("Please enter your address");
      return;
    }
    if (!/^\d+$/.test(zipCode)) {
      alert("ZipCode should be numeric");
      return;
    } else {
      alert("Address Added Successfully");
      navigation.navigate("AddressListScreen");
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.MainContainer}>
      <View style={styles.container}>
        <Text style={styles.HeadingStyle}>Address Details</Text>
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
        {/* <View style={styles.inputContainer}>
          <Text style={styles.labels}>Area</Text>
          <TextInput
            placeholder="Enter your Area"
            style={styles.inputfield}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setArea}
            value={area}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Area</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              style={styles.dropdown}
              selectedValue={selectedArea}
              onValueChange={(itemValue) => setSelectedArea(itemValue)}
            >
              {areas.map((area) => (
                <Picker.Item key={area} label={area} value={area} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Apartment</Text>
          <TextInput
            placeholder="Enter your street"
            style={styles.inputfield}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setStreet}
            value={street}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer2}>
            <Text style={styles.labels}>City</Text>
            <TextInput
              placeholder="Enter your City"
              style={styles.inputfield2}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setCity}
              value={city}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.labels}>Country</Text>
            <TextInput
              placeholder="Enter your Country"
              style={styles.inputfield2}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setCountry}
              value={country}
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer2}>
            <Text style={styles.labels}>State</Text>
            <TextInput
              placeholder="Enter your state"
              style={styles.inputfield2}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setState}
              value={state}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.labels}>Zip code</Text>
            <TextInput
              placeholder="Enter your zipCode"
              style={styles.inputfield2}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setZipCode}
              value={zipCode}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Instructions (Optional)</Text>
          <View style={styles.inputfieldContainer}>
            <TextInput
              placeholder="Enter instructions"
              style={styles.inputfield3}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setInstructions}
              value={instructions}
              multiline={true}
              numberOfLines={2}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn1}
          onPress={OnSubmit}
          disabled={false} // Disable the button in edit mode
        >
          <Text style={styles.btnText}>{isEdit ? "Save changes" : "Add"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default EditAddressScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginTop: 70,
  },
  HeadingStyle: {
    color: "#16a085",
    fontWeight: "700",
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: 15,
    marginVertical: 10,
  },
  inputContainer: {
    width: "100%",
    height: "12%",

    // borderTopLeftRadius: "130",
    // paddingTop: "100",
    Display: "flex",
    marginVertical: 4,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 110,
    width: "100%",
    //backgroundColor: "yellow",
    top: 5,
  },

  inputContainer2: {
    width: "46%",
    height: "95%",

    // borderTopLeftRadius: "130",
    // paddingTop: "100",

    marginVertical: 5,
  },
  labels: {
    fontSize: 20,
    color: "black",
    marginLeft: "4%",
    marginBottom: "2%",
    marginTop: "2%",
  },
  inputfield: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: "5%",
    width: "95%",
    marginLeft: "2%",
  },
  inputfield2: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: 20,
    width: "95%",
    marginLeft: "2%",
  },
  inputfieldContainer: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    paddingHorizontal: "5%",
    paddingTop: 10,
    width: "95%",
    marginLeft: "2%",
  },
  inputfield3: {
    height: 70,
  },

  btn1: {
    backgroundColor: "#16a085",
    height: 60,
    width: "92%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 75,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  dropdownContainer: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: "2%",
    width: "95%",
    marginLeft: "2%",
  },
  dropdown: {
    width: "100%",
    height: 40,
  },
});
